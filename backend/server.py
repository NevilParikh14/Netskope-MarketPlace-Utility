import datetime
from datetime import datetime
import logging
import os
from flask import Flask
import base64
import json
import requests
import re
import threading
from collections import defaultdict

app = Flask(__name__)


def page_is_loading(Driver):
    while True:
        x = Driver.execute_script("return document.readyState")
        if x == "complete":
            return True
        else:
            yield False


def get_dates(ga_plugins, headers, repository_name, repo, folder, unuseful):
    if folder not in unuseful:
        ga_plugins[repo][folder] = {}
        url = f"https://api.github.com/repos/netskopeoss/{repository_name}/commits?path={folder}"
        r_date = requests.get(url, headers=headers)
        data_commit = r_date.json()
        last_commit = data_commit[0]["commit"]["committer"]["date"]
        ga_plugins[repo][folder]["date"] = last_commit
        return ga_plugins


def github_get_folders(repo, ga_plugins, unuseful, repository_name, github_token=None):
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if github_token:
        headers["Authorization"] = f"Bearer {github_token}"

    url = f"https://api.github.com/repos/netskopeoss/{repository_name}/git/trees/main"
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    data = r.json()
    # print(data)
    threads = list()
    for i in range(len(data["tree"])):
        folder = data["tree"][i]["path"]
        x = threading.Thread(
            target=get_dates,
            args=(
                ga_plugins,
                headers,
                repository_name,
                repo,
                folder,
                unuseful,
            ),
        )
        threads.append(x)
        x.start()

    for index, thread in enumerate(threads):
        logging.info("Main    : before joining thread %d.", index)
        thread.join()
        logging.info("Main    : thread %d done", index)

    return ga_plugins


def github_read_file(username, repository_name, file_path, github_token=None):
    headers = {}
    if github_token:
        headers["Authorization"] = f"token {github_token}"

    url = f"https://api.github.com/repos/{username}/{repository_name}/contents/{file_path}"
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    data = r.json()
    file_content = data["content"]
    file_content_encoding = data.get("encoding")
    if file_content_encoding == "base64":
        file_content = base64.b64decode(file_content).decode()

    return file_content


def thread_function(
    plugin_list, plugin, github_token, username, repository_name, repo, ga_plugins
):
    plugin_list_temp = {}
    file_path = plugin + "/main.py"
    file_content = github_read_file(
        username, repository_name, file_path, github_token=github_token
    )
    module = re.findall("from netskope\.integrations\.(\S+)\.plugin_base", file_content)
    pull = re.search("def pull\(", file_content)
    push = re.search("def push\(", file_content)
    if module[0] == "grc":
        module[0] = "are"
    elif module[0] == "itsm":
        module[0] = "cto"
    elif module[0] == "cre":
        module[0] = "ure"
    if module[0] == "cte":
        plugin_list_temp["methods"] = []
        if pull:
            plugin_list_temp["methods"].append("Pull")
        if push:
            plugin_list_temp["methods"].append("Push")
    plugin_list_temp["module"] = module[0].upper()
    file_path = plugin + "/manifest.json"
    file_content = github_read_file(
        username, repository_name, file_path, github_token=github_token
    )
    data = json.loads(file_content)
    plugin_list_temp["plugin_name"] = data["name"]
    plugin_list_temp["version"] = data["version"]
    if module[0] == "cls":
        plugin_list_temp["event_types"] = data["types"]
        try:
            file_path = plugin + "/mappings.json"
            file_content = github_read_file(
                username, repository_name, file_path, github_token=github_token
            )
            plugin_mapping = json.loads(file_content)
            json_mapping = json.loads(plugin_mapping["jsonData"])
            mapping_version = ""
            for keyn in json_mapping.keys():
                if "version" in keyn.lower():
                    mapping_version = json_mapping[keyn]
                    break
            print(plugin, json_mapping["taxonomy"].keys())
            plugin_list_temp["mapping_file"] = (
                plugin_mapping["name"] + " " + mapping_version
            )
            for eventtype in plugin_list_temp["event_types"]:
                print(eventtype)
                if eventtype in json_mapping["taxonomy"].keys():
                    plugin_list_temp[eventtype] = list(
                        json_mapping["taxonomy"][eventtype].keys()
                    )
                else:
                    plugin_list_temp[eventtype] = ["No mapping Available"]
        except:
            for eventtype in plugin_list_temp["event_types"]:
                plugin_list_temp[eventtype] = ["No mapping File"]
    if repo == "ga":
        plugin_list_temp["ga_version"] = data["version"]
    elif repo == "beta":
        plugin_list_temp["beta_version"] = str(data["version"])
    plugin_list_temp[repo] = ga_plugins[repo][plugin]["date"]
    file_path = plugin + "/CHANGELOG.md"
    try:
        file_content = github_read_file(
            username, repository_name, file_path, github_token=github_token
        )
        plugin_list_temp["release_notes"] = file_content
    except requests.exceptions.HTTPError:
        file_path = plugin + "/CHANGELOG.MD"
        try:
            file_content = github_read_file(
                username, repository_name, file_path, github_token=github_token
            )
            plugin_list_temp["release_notes"] = file_content
        except requests.exceptions.HTTPError:
            plugin_list_temp["release_notes"] = ""
    plugin_list_temp["folder"] = plugin
    plugin_list.append(plugin_list_temp)


@app.route("/data")
def send_data():
    data_file_path = os.getcwd() + "\data.json"
    try:
        with open(data_file_path, "r") as f:
            return json.load(f)
    except:
        return fetch_data()


@app.route("/fetch")
def fetch_data():
    ga_plugins = defaultdict(dict)
    unuseful = ["LICENSE", "README.md"]

    plugin_list = []
    for repo in ["ga", "beta"]:
        if repo == "ga":
            repository_name = "ta_cloud_exchange_plugins"
        else:
            repository_name = "ta_cloud_exchange_beta_plugins"
        github_token = "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"

        github_get_folders(repo, ga_plugins, unuseful, repository_name, github_token)
        
        username = "netskopeoss"
        threads = []
        for plugin in ga_plugins[repo].keys():
            logging.info("Main    : create and start thread %d.", plugin)
            x = threading.Thread(
                target=thread_function,
                args=(
                    plugin_list,
                    plugin,
                    github_token,
                    username,
                    repository_name,
                    repo,
                    ga_plugins,
                ),
            )
            threads.append(x)
            x.start()

        for index, thread in enumerate(threads):
            logging.info("Main    : before joining thread %d.", index)
            thread.join()
            logging.info("Main    : thread %d done", index)
            
    present_in_both = {}
    for i in range(len(plugin_list)):
        if (
            plugin_list[i]["folder"] + "_" + plugin_list[i]["module"]
            not in present_in_both.keys()
        ):
            present_in_both[
                plugin_list[i]["folder"] + "_" + plugin_list[i]["module"]
            ] = []
        present_in_both[
            plugin_list[i]["folder"] + "_" + plugin_list[i]["module"]
        ].append(i)
    need_to_remove = []
    for i in present_in_both.keys():
        if len(present_in_both[i]) > 1:
            if (
                plugin_list[present_in_both[i][0]]["version"].split("-")[0]
                == plugin_list[present_in_both[i][1]]["version"].split("-")[0]
            ):
                plugin_list[present_in_both[i][0]]["beta"] = plugin_list[
                    present_in_both[i][1]
                ]["beta"]
                plugin_list[present_in_both[i][0]]["beta_version"] = plugin_list[
                    present_in_both[i][1]
                ]["beta_version"]
                need_to_remove.append(present_in_both[i][1])
            elif (
                plugin_list[present_in_both[i][0]]["version"]
                .split("-")[0]
                .split(".")[0]
                > plugin_list[present_in_both[i][1]]["version"]
                .split("-")[0]
                .split(".")[0]
            ):
                plugin_list[present_in_both[i][0]]["beta_version"] = plugin_list[
                    present_in_both[i][1]
                ]["beta_version"]
                need_to_remove.append(present_in_both[i][1])
            elif (
                plugin_list[present_in_both[i][0]]["version"]
                .split("-")[0]
                .split(".")[0]
                < plugin_list[present_in_both[i][1]]["version"]
                .split("-")[0]
                .split(".")[0]
            ):
                plugin_list[present_in_both[i][1]]["ga_version"] = plugin_list[
                    present_in_both[i][0]
                ]["ga_version"]
                need_to_remove.append(present_in_both[i][0])
            elif (
                plugin_list[present_in_both[i][0]]["version"]
                .split("-")[0]
                .split(".")[1]
                > plugin_list[present_in_both[i][1]]["version"]
                .split("-")[0]
                .split(".")[1]
            ):
                plugin_list[present_in_both[i][0]]["beta_version"] = plugin_list[
                    present_in_both[i][1]
                ]["beta_version"]
                need_to_remove.append(present_in_both[i][1])
            elif (
                plugin_list[present_in_both[i][0]]["version"]
                .split("-")[0]
                .split(".")[1]
                < plugin_list[present_in_both[i][1]]["version"]
                .split("-")[0]
                .split(".")[1]
            ):
                plugin_list[present_in_both[i][1]]["ga_version"] = plugin_list[
                    present_in_both[i][0]
                ]["ga_version"]
                need_to_remove.append(present_in_both[i][0])
            elif (
                plugin_list[present_in_both[i][0]]["version"]
                .split("-")[0]
                .split(".")[2]
                > plugin_list[present_in_both[i][1]]["version"]
                .split("-")[0]
                .split(".")[2]
            ):
                plugin_list[present_in_both[i][0]]["beta_version"] = plugin_list[
                    present_in_both[i][1]
                ]["beta_version"]
                need_to_remove.append(present_in_both[i][1])
            elif (
                plugin_list[present_in_both[i][0]]["version"]
                .split("-")[0]
                .split(".")[2]
                < plugin_list[present_in_both[i][1]]["version"]
                .split("-")[0]
                .split(".")[2]
            ):
                plugin_list[present_in_both[i][1]]["ga_version"] = plugin_list[
                    present_in_both[i][0]
                ]["ga_version"]
                need_to_remove.append(present_in_both[i][0])
    need_to_remove = sorted(need_to_remove, reverse=True)
    for i in need_to_remove:
        plugin_list.pop(i)
    for i in range(len(plugin_list)):
        if plugin_list[i].get("ga"):
            datetime_object = datetime.strptime(
                plugin_list[i]["ga"].split("T")[0], "%Y-%m-%d"
            )
            plugin_list[i]["ga"] = datetime_object.strftime("%m/%d/%Y")
        if plugin_list[i].get("beta"):
            datetime_object = datetime.strptime(
                plugin_list[i]["beta"].split("T")[0], "%Y-%m-%d"
            )
            plugin_list[i]["beta"] = datetime_object.strftime("%m/%d/%Y")
        temp_release = plugin_list[i]["release_notes"].split("\n")
        plugin_list[i]["more_release_notes"] = ""
        plugin_list[i]["release_notes"] = ""
        count = 0
        for j in range(len(temp_release)):
            if "# " in temp_release[j] and not "##" in temp_release[j]:
                count += 1
                if count == 2:
                    for k in range(j, len(temp_release)):
                        plugin_list[i]["more_release_notes"] += temp_release[k] + "\n"
                    break
            plugin_list[i]["release_notes"] += temp_release[j] + "\n"
    data_file_path = os.getcwd() + "\data.json"
    with open(data_file_path, "w") as f:
        json.dump({"plugin": plugin_list}, f)
    return {"plugin": plugin_list}


# Running app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
