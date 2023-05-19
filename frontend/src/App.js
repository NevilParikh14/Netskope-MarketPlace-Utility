// Importing modules
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Collapsible from 'react-collapsible';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./App.css";


function App() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const filterd_cte = data.filter(cte => cte.module === 'CTE');
  let l_cte = filterd_cte.filter((ele, ind) => ind === filterd_cte.findIndex(elem => elem.plugin_name === ele.plugin_name))
  const length_cte = l_cte.length;
  const filterd_cls = data.filter(cls => cls.module === 'CLS');
  let l_cls = filterd_cls.filter((ele, ind) => ind === filterd_cls.findIndex(elem => elem.plugin_name === ele.plugin_name))
  const length_cls = l_cls.length;
  const filterd_cto = data.filter(cto => cto.module === 'CTO');
  let l_cto = filterd_cto.filter((ele, ind) => ind === filterd_cto.findIndex(elem => elem.plugin_name === ele.plugin_name))
  const length_cto = l_cto.length;
  const filterd_ure = data.filter(ure => ure.module === 'URE');
  let l_ure = filterd_ure.filter((ele, ind) => ind === filterd_ure.findIndex(elem => elem.plugin_name === ele.plugin_name))
  const length_ure = l_ure.length;
  const filterd_are = data.filter(are => are.module === 'ARE');
  let l_are = filterd_are.filter((ele, ind) => ind === filterd_are.findIndex(elem => elem.plugin_name === ele.plugin_name))
  const length_are = l_are.length;
  let in_both = data.filter((obj) => (obj.ga !== undefined && obj.beta !== undefined))
  const length_in_both = in_both.length;
  let in_beta = data.filter((obj) => (obj.ga == undefined && obj.beta !== undefined))
  const length_in_beta = in_beta.length;
  const ResultArea = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 13px;
  text-align: left;
  `;


  useEffect(() => {
    const interval = setInterval(onClick_fetch, 18000000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() =>
    onClick_refresh
    , []);
  var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [buttonText, setButtonText] = useState('Fetch');
  const [diasable, setDisabled] = useState(false);
  const onClick_fetch = () => {
    setDisabled(true); setButtonText('Fetching...'); fetch("/fetch").then((res) =>
      res.json().then((actualdata) => {
        setDisabled(false);
        setButtonText('Fetch (' + date + ')');
      })
    );
  }

  const onClick_refresh = () => {
    setLoading(true); fetch("/data").then((res) =>
      res.json().then((actualdata) => {
        setLoading(false);
        console.log(actualdata)
        setdata(actualdata.plugin);
        console.log(data);
      })
    );
  }
  return (
    <div>
      <div className="row">
        <div className="fixed-header-1">
          <p style={{ "fontSize": "110%", "backgroundColor": "black", "color": "white", "width": "60%", "textAlign": "center" }}><b><i> Netskope MarketPlace </i></b></p>
          <button style={{ "fontSize": "100%", "backgroundColor": "black", "color": "white", "border": "double", "width": "20%" }} onClick={onClick_refresh}><b> Load </b></button>
          <button disabled={diasable} style={{ "fontSize": "100%", "backgroundColor": "black", "color": "white", "border": "double", "width": "20%" }} onClick={onClick_fetch}><b> {buttonText} </b></button>
        </div></div>
      <div id="customers">
        <div className="fixed-header">
          <tbody>
            <tr>
              <th style={{ "width": "5%" }}>Module</th>
              <th style={{ "width": "10%" }}>Name</th>
              <th style={{ "width": "5%" }}>Version</th>
              <th style={{ "width": "50%" }}>Release Notes</th>
              <th style={{ "width": "5%" }}>Beta_Date</th>
              <th style={{ "width": "5%" }}>GA_date</th>
            </tr>
          </tbody>
        </div>
      </div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div id="customers">
          <div className="div-tags-cls"><Collapsible close trigger="> CLS Module <" triggerStyle={{ "fontSize": "30px" }}><table style={{ "width": "100%" }}>
            <tbody>
              {filterd_cls.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                <tr key={index}>
                  <td style={{ "width": "5%" }}>{item.module}</td>
                  <td style={{ "width": "10%" }}>{item.plugin_name}</td>
                  <td style={{ "width": "5%" }}>{item.version}</td>
                  <td style={{ "width": "50%" }}><ResultArea><ReactMarkdown>{item.release_notes}</ReactMarkdown><Collapsible close trigger="> Old Releases"><ReactMarkdown>{item.more_release_notes}</ReactMarkdown></Collapsible></ResultArea></td>
                  <td style={{ "width": "5%" }}>{item.beta}</td>
                  <td style={{ "width": "5%" }}>{item.ga}</td>
                </tr>
              ))}
            </tbody>
          </table></Collapsible></div>
          <div className="div-tags"><ResultArea></ResultArea><Collapsible close trigger="> CTE Module <" triggerStyle={{ "fontSize": "30px" }}><table style={{ "width": "100%" }}>
            <tbody>
              {filterd_cte.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                <tr key={index}>
                  <td style={{ "width": "5%" }}>{item.module}</td>
                  <td style={{ "width": "10%" }}>{item.plugin_name}</td>
                  <td style={{ "width": "5%" }}>{item.version}</td>
                  <td style={{ width: "50%" }}><ResultArea><ReactMarkdown>{item.release_notes}</ReactMarkdown><Collapsible close trigger="> Old Releases"><ReactMarkdown>{item.more_release_notes}</ReactMarkdown></Collapsible></ResultArea></td>
                  <td style={{ "width": "5%" }}>{item.beta}</td>
                  <td style={{ "width": "5%" }}>{item.ga}</td>
                </tr>
              ))}
            </tbody>
          </table></Collapsible></div>
          <div className="div-tags"><Collapsible close trigger="> CTO Module <" triggerStyle={{ "fontSize": "30px" }}><table style={{ "width": "100%" }}>
            <tbody>
              {filterd_cto.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                <tr key={index}>
                  <td style={{ "width": "5%" }}>{item.module}</td>
                  <td style={{ "width": "10%" }}>{item.plugin_name}</td>
                  <td style={{ "width": "5%" }}>{item.version}</td>
                  <td style={{ width: "50%" }}><ResultArea><ReactMarkdown>{item.release_notes}</ReactMarkdown><Collapsible close trigger="> Old Releases"><ReactMarkdown>{item.more_release_notes}</ReactMarkdown></Collapsible></ResultArea></td>
                  <td style={{ "width": "5%" }}>{item.beta}</td>
                  <td style={{ "width": "5%" }}>{item.ga}</td>
                </tr>
              ))}
            </tbody>
          </table></Collapsible></div>
          <div className="div-tags"><Collapsible close trigger="> URE Module <" triggerStyle={{ "fontSize": "30px" }}><table style={{ "width": "100%" }}>
            <tbody>
              {filterd_ure.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                <tr key={index}>
                  <td style={{ "width": "5%" }}>{item.module}</td>
                  <td style={{ "width": "10%" }}>{item.plugin_name}</td>
                  <td style={{ "width": "5%" }}>{item.version}</td>
                  <td style={{ width: "50%" }}><ResultArea><ReactMarkdown>{item.release_notes}</ReactMarkdown><Collapsible close trigger="> Old Releases"><ReactMarkdown>{item.more_release_notes}</ReactMarkdown></Collapsible></ResultArea></td>
                  <td style={{ "width": "5%" }}>{item.beta}</td>
                  <td style={{ "width": "5%" }}>{item.ga}</td>
                </tr>
              ))}
            </tbody>
          </table></Collapsible></div>
          <div className="div-tags"><Collapsible close trigger="> ARE Module <" triggerStyle={{ "fontSize": "30px" }}><table style={{ "width": "100%" }}>
            <tbody>
              {filterd_are.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                <tr key={index}>
                  <td style={{ "width": "5%" }}>{item.module}</td>
                  <td style={{ "width": "10%" }}>{item.plugin_name}</td>
                  <td style={{ "width": "5%" }}>{item.version}</td>
                  <td style={{ width: "50%" }}><ResultArea><ReactMarkdown>{item.release_notes}</ReactMarkdown><Collapsible close trigger="> Old Releases"><ReactMarkdown>{item.more_release_notes}</ReactMarkdown></Collapsible></ResultArea></td>
                  <td style={{ "width": "5%" }}>{item.beta}</td>
                  <td style={{ "width": "5%" }}>{item.ga}</td>
                </tr>
              ))}
            </tbody>
          </table></Collapsible></div>
        </div>
      )}
      <div id="customers">
        <table style={{ "width": "100%", "textAlign": "center" }}>
          <tr>
            <th>
              CLS
            </th>
            <th>
              CTE
            </th>
            <th>
              CTO
            </th>
            <th>
              URE
            </th>
            <th>
              ARE
            </th>
          </tr>
          <tr>
            <td>
              <Popup trigger=
                {<button> {length_cls} </button>}
                nested modal>
                <div className="modal">
                  <div className="header">
                    <h2>CLS Plugins</h2>
                  </div>
                  <div className="content">
                    {l_cls.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                      <div key={index}>
                        <li>{item.plugin_name}</li>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </td>
            <td>
              <Popup trigger=
                {<button> {length_cte} </button>}
                nested modal>
                <div className="modal">
                  <div className="header">
                    <h2>CTE Plugins</h2>
                  </div>
                  <div className="content">
                    {l_cte.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                      <div key={index}>
                        <li>{item.plugin_name}</li>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </td>
            <td>
              <Popup trigger=
                {<button> {length_cto} </button>}
                nested modal>
                <div className="modal">
                  <div className="header">
                    <h2>CTO Plugins</h2>
                  </div>
                  <div className="content">
                    {l_cto.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                      <div key={index}>
                        <li>{item.plugin_name}</li>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </td>
            <td>
              <Popup trigger=
                {<button> {length_ure} </button>}
                nested modal>
                <div className="modal">
                  <div className="header">
                    <h2>URE Plugins</h2>
                  </div>
                  <div className="content">
                    {l_ure.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                      <div key={index}>
                        <li>{item.plugin_name}</li>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </td>
            <td>
              <Popup trigger=
                {<button> {length_are} </button>}
                nested modal>
                <div className="modal">
                  <div className="header">
                    <h2>ARE Plugins</h2>
                  </div>
                  <div className="content">
                    {l_are.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                      <div key={index}>
                        <li>{item.plugin_name}</li>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </td>
          </tr>
        </table>
        <table style={{ "width": "100%", "textAlign": "center" }}>
          <tr>
            <th style={{ "width": "50%" }}>Need To Remove from Beta Repo</th>
            <th style={{ "width": "50%" }}>Need To GA</th></tr>
          <tr>
            <td><Popup trigger=
              {<button> {length_in_both} </button>}
              nested modal>
              <div className="modal">
                <div className="header">
                  <h2>Plugins</h2>
                </div>
                <div className="content">
                  {in_both.sort((a, b) => a.module < b.module ? -1 : 1,).map((item, index) => (
                    <div key={index}> {parseInt((Date.parse(item.ga) - Date.parse(item.beta)) / (1000 * 3600 * 24)) >= 15 ? (<p style={{ "color": "red" }}><b>[{item.module}]</b> <u><i>{item.plugin_name}</i></u> -- <b>{parseInt((Date.parse(item.ga) - Date.parse(item.beta)) / (1000 * 3600 * 24))}</b> Days</p>) : (<p><b>[{item.module}]</b> <u><i>{item.plugin_name}</i></u> -- <b>{parseInt((Date.parse(item.ga) - Date.parse(item.beta)) / (1000 * 3600 * 24))}</b> Days</p>)}
                    </div>
                  ))}
                </div>
              </div>
            </Popup></td>
            <td><Popup trigger=
              {<button> {length_in_beta} </button>}
              nested modal>
              <div className="modal">
                <div className="header">
                  <h2>Plugins</h2>
                </div>
                <div className="content">
                  {in_beta.sort((a, b) => a.module < b.module ? -1 : 1,).map((item, index) => (
                    <div key={index}> {parseInt((Date.parse(Date()) - Date.parse(item.beta)) / (1000 * 3600 * 24)) >= 15 ? (<p style={{ "color": "red" }}><b>[{item.module}]</b> <u><i>{item.plugin_name}</i></u> -- <b>{parseInt((Date.parse(Date()) - Date.parse(item.beta)) / (1000 * 3600 * 24))}</b> Days</p>) : (<p><b>[{item.module}]</b> <u><i>{item.plugin_name}</i></u> -- <b>{parseInt((Date.parse(Date()) - Date.parse(item.beta)) / (1000 * 3600 * 24))}</b> Days</p>)}
                    </div>
                  ))}
                </div>
              </div>
            </Popup></td>
          </tr>
        </table>
      </div>
    </div>
  );

}


export default App;
