import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Collapsible from 'react-collapsible';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaEraser } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Home = () => {
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

    const filtered_ga = data.filter(ver => ver.ga_version !== undefined);

    const filterd_cte_ga = data.filter(cte => cte.module === 'CTE' && cte.ga_version !== undefined);
    let l_cte_ga = filterd_cte_ga.filter((ele, ind) => ind === filterd_cte_ga.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_cte_ga = l_cte_ga.length;
    const filterd_cls_ga = data.filter(cls => cls.module === 'CLS' && cls.ga_version !== undefined);
    let l_cls_ga = filterd_cls_ga.filter((ele, ind) => ind === filterd_cls_ga.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_cls_ga = l_cls_ga.length;
    const filterd_cto_ga = data.filter(cto => cto.module === 'CTO' && cto.ga_version !== undefined);
    let l_cto_ga = filterd_cto_ga.filter((ele, ind) => ind === filterd_cto_ga.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_cto_ga = l_cto_ga.length;
    const filterd_ure_ga = data.filter(ure => ure.module === 'URE' && ure.ga_version !== undefined);
    let l_ure_ga = filterd_ure_ga.filter((ele, ind) => ind === filterd_ure_ga.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_ure_ga = l_ure_ga.length;
    const filterd_are_ga = data.filter(are => are.module === 'ARE' && are.ga_version !== undefined);
    let l_are_ga = filterd_are_ga.filter((ele, ind) => ind === filterd_are_ga.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_are_ga = l_are_ga.length;

    const filtered_beta = data.filter(ver => ver.beta_version !== undefined);

    const filterd_cte_beta = data.filter(cte => cte.module === 'CTE' && cte.beta_version !== undefined);
    let l_cte_beta = filterd_cte_beta.filter((ele, ind) => ind === filterd_cte_beta.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_cte_beta = l_cte_beta.length;
    const filterd_cls_beta = data.filter(cls => cls.module === 'CLS' && cls.beta_version !== undefined);
    let l_cls_beta = filterd_cls_beta.filter((ele, ind) => ind === filterd_cls_beta.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_cls_beta = l_cls_beta.length;
    const filterd_cto_beta = data.filter(cto => cto.module === 'CTO' && cto.beta_version !== undefined);
    let l_cto_beta = filterd_cto_beta.filter((ele, ind) => ind === filterd_cto_beta.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_cto_beta = l_cto_beta.length;
    const filterd_ure_beta = data.filter(ure => ure.module === 'URE' && ure.beta_version !== undefined);
    let l_ure_beta = filterd_ure_beta.filter((ele, ind) => ind === filterd_ure_beta.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_ure_beta = l_ure_beta.length;
    const filterd_are_beta = data.filter(are => are.module === 'ARE' && are.beta_version !== undefined);
    let l_are_beta = filterd_are_beta.filter((ele, ind) => ind === filterd_are_beta.findIndex(elem => elem.plugin_name === ele.plugin_name))
    const length_are_beta = l_are_beta.length;

    let in_both = data.filter((obj) => (obj.ga !== undefined && obj.beta !== undefined && (parseInt((Date.parse(Date()) - Date.parse(obj.ga)) / (1000 * 3600 * 24)) >= 15)))
    const length_in_both = in_both.length;
    let in_beta = data.filter((obj) => (obj.ga === undefined && obj.beta !== undefined && parseInt((Date.parse(Date()) - Date.parse(obj.beta)) / (1000 * 3600 * 24)) >= 15))
    const length_in_beta = in_beta.length;

    const ResultArea = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 13px;
  text-align: left;
  `;

    let data_line_beta = [
        ["Module", "Name", "Start", "End"],
    ];

    in_both.forEach((item) => {
        let temp_item = [];
        temp_item = [...temp_item, item.module];
        temp_item = [...temp_item, item.plugin_name];
        temp_item = [...temp_item, Date.parse(item.ga)];
        temp_item = [...temp_item, Date.parse(Date())];
        data_line_beta = [...data_line_beta, temp_item];
        // console.log(data_line_beta);
    }
    );

    let data_line_ga = [
        ["Module", "Name", "Start", "End"],
    ];

    in_beta.forEach((item) => {
        let temp_item = [];
        temp_item = [...temp_item, item.module];
        temp_item = [...temp_item, item.plugin_name];
        temp_item = [...temp_item, Date.parse(item.beta)];
        temp_item = [...temp_item, Date.parse(Date())];
        data_line_ga = [...data_line_ga, temp_item];
        // console.log(data_line_ga);
    }
    );

    const data_ga = [
        ["Task", "Plugins Count"],
        ["Future", 0],
        ["CLS" + " (" + length_cls_ga + ")", length_cls_ga],
        ["CTE" + " (" + length_cte_ga + ")", length_cte_ga],
        ["CTO" + " (" + length_cto_ga + ")", length_cto_ga],
        ["URE" + " (" + length_ure_ga + ")", length_ure_ga],
        ["ARE" + " (" + length_are_ga + ")", length_are_ga]
    ];

    const data_beta = [
        ["Task", "Plugins Count"],
        ["Future", 0],
        ["CLS" + " (" + length_cls_beta + ")", length_cls_beta],
        ["CTE" + " (" + length_cte_beta + ")", length_cte_beta],
        ["CTO" + " (" + length_cto_beta + ")", length_cto_beta],
        ["URE" + " (" + length_ure_beta + ")", length_ure_beta],
        ["ARE" + " (" + length_are_beta + ")", length_are_beta]
    ];

    const overall = [
        ["Task", "Plugins Count"],
        ["Future", 0],
        ["CLS" + " (" + length_cls + ")", length_cls],
        ["CTE" + " (" + length_cte + ")", length_cte],
        ["CTO" + " (" + length_cto + ")", length_cto],
        ["URE" + " (" + length_ure + ")", length_ure],
        ["ARE" + " (" + length_are + ")", length_are]
    ];

    const options = {
        title: "My Daily Activities",
    };
    useEffect(() => {
        const interval = setInterval(onClick_fetch, 18000000);
        return () => clearInterval(interval);
    }, []);
    const onClick_refresh = () => {
        setLoading(true); fetch("/data", { mode: "no-cors" }).then((res) =>
            res.json().then((actualdata) => {
                setLoading(false);
                // console.log(actualdata)
                setdata(actualdata.plugin);
                // console.log(data);
            })
        );
    }
    useEffect(() => {
        onClick_refresh();
    }
        , []);
    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // const [date_fetched, setDate] = useState(date);
    const [buttonText, setButtonText] = useState('Fetch');
    const [diasable, setDisabled] = useState(false);
    const onClick_fetch = () => {
        setDisabled(true); setButtonText('Fetching...'); fetch('/fetch', { mode: "no-cors" }).then((res) =>
            res.json().then((actualdata) => {
                setDisabled(false);
                // setDate(date)
                setButtonText('Fetch (' + date + ')');
                // console.log(actualdata)
                // setdata(actualdata.plugin);
                // console.log(actualdata);
            })
        );
    }
    const productList = ["blue pant"
        , "black pant"
        , "blue shirt"
        , "black shoes"
        , "brown shoes"
        , "white pant"
        , "white shoes"
        , "red shirt"
        , "gray pant"
        , "white shirt"
        , "golden shoes"
        , "dark pant"
        , "pink shirt"
        , "yellow pant"];
    const [products, setProducts] = useState(data);
    const [searchVal, setSearchVal] = useState("");
    const handleSearchData = (e) =>{
        setSearchVal(e.target.value);
        setProducts(data);
        console.log(products)
    };

    return (
        <div className='div-tags-cls'>
            {/* {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : ( */}
            <div>
                <div className='rowC'>
                    <input
                        style={{ "width": "100%", "padding": "10px" }}
                        type="text"
                        placeholder="Plugin Name"
                        onChange={(e) => handleSearchData(e)}
                    // onChange={handleChange}
                    // value={searchInput} 
                    />
                    {/* <FaEraser style={{ "width": "10%" }} onClick={handleSearchClick} /> */}
                </div>
                <div>
                    {
                        searchVal === "" ? (<div></div>) : (<div>{products.map((product) => {
                            console.log(product.plugin_name);
                            if (product.plugin_name.toLowerCase().includes(searchVal.toLowerCase())){
                                return (
                                    <div style={{"textAlign": "left", "padding": "5px"}}><b>Module - </b>{product.module} || <b>Plugin - </b>{product.plugin_name} ({product.folder}) || <b>GA Version - </b>{product.ga_version} || <b>GA Date - </b>{product.ga} || <b>Beta Version - </b>{product.beta_version} || <b>Beta Date - </b>{product.beta} <Link to={product.module}>More Info</Link></div>
                                )
                            }
                        })
                        }</div>)
                    }
                </div>
                <div className='rowC'>
                    <button className='button1' style={{ "width": "50%", "border": "double" }} onClick={onClick_refresh}><span>Load</span></button>
                    <button className='button1' disabled={diasable} style={{ "width": "50%", "border": "double" }} onClick={onClick_fetch}><span>{buttonText}</span></button>
                </div>
                <div>
                    <div>
                        <fieldset style={{ "fontSize": "20px" }}><legend><b><i><u>Overall</u></i></b></legend>
                            <Chart
                                chartType="PieChart"
                                data={overall}
                                // options={options}
                                width={"100%"}
                                height={"400px"}
                            />
                        </fieldset>
                    </div>
                    <div className='rowC' style={{ "width": "100%" }}>
                        <div style={{ "width": "50%", "padding": "2px" }}>
                            <fieldset style={{ "fontSize": "20px" }}><legend ><b><i><u>GA Repo</u></i></b></legend>
                                {/* <Chart
                            chartType="PieChart"
                            data={data_ga}
                            // options={options}
                            width={"100%"}
                            height={"400px"}
                        // legendToggle
                        // chartEvents={[
                        //     {
                        //         callback: ({ chartWrapper, google }) => {
                        //             const chart = chartWrapper.getChart();
                        //             // chart.container.addEventListener("click", (ev) => console.log("Ready"))
                        //             const data = chartWrapper.getDataTable();
                        //             google.visualization.events.addListener(chart, "click", function () {

                        //             });
                        //         },
                        //         eventName: "ready"
                        //     }
                        // ]}
                        /> */}
                                <div id="customers">
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> CLS Plugins ({length_cls_ga}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_cls_ga.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.ga_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> CTE Plugins ({length_cte_ga}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_cte_ga.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.ga_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> CTO Plugins ({length_cto_ga}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_cto_ga.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.ga_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> URE Plugins ({length_ure_ga}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_ure_ga.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.ga_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> ARE Plugins ({length_are_ga}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_are_ga.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.ga_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                </div>
                            </fieldset>
                        </div>
                        <div style={{ "width": "50%", "padding": "2px" }}>
                            <fieldset style={{ "fontSize": "20px" }}><legend ><b><i><u>Beta Repo</u></i></b></legend>
                                {/* <Chart
                            chartType="PieChart"
                            data={data_beta}
                            // options={options}
                            width={"100%"}
                            height={"400px"}
                        /> */}
                                <div id="customers">
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> CLS Plugins ({length_cls_beta}) </span></button>} triggerStyle={{ "fontSize": "30px", "overflowWhenOpen": "scroll" }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_cls_beta.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.beta_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> CTE Plugins ({length_cte_beta}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_cte_beta.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.beta_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> CTO Plugins ({length_cto_beta}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_cto_beta.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.beta_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> URE Plugins ({length_ure_beta}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_ure_beta.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.beta_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                    <div><Collapsible close trigger={<button className="button1" style={{ "fontSize": "30px", "border": "None" }}><span> ARE Plugins ({length_are_beta}) </span></button>} triggerStyle={{ "fontSize": "30px", }}><table style={{ "width": "100%" }}>
                                        <tbody>
                                            <div className="content">
                                                {filterd_are_beta.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
                                                    <div key={index}> <td style={{ "border": "inset", "width": "1%" }}><b>{item.module}</b></td><td style={{ "border": "outset", "width": "55%" }}><u><i>{item.plugin_name}</i></u></td><td style={{ "border": "inset", "width": "12%" }}><b>{item.beta_version}</b></td>
                                                    </div>
                                                ))}
                                            </div>
                                        </tbody>
                                    </table></Collapsible></div>
                                </div>

                            </fieldset>
                        </div>
                    </div >
                    <div>
                        <fieldset style={{ "fontSize": "20px" }}><legend ><b><i><u>Need To Remove from Beta Repo</u></i></b></legend>
                            {data_line_beta.length >= 2 ? (
                                <Chart
                                    chartType="Timeline"
                                    data={data_line_beta}
                                    options={options}
                                    width={"100%"}
                                // height={"400px"}
                                />
                            ) : (<p>No Data</p>)}
                        </fieldset>
                    </div>
                    <div>
                        <fieldset style={{ "fontSize": "20px" }}><legend><b><i><u>Need To GA</u></i></b></legend>
                            {data_line_ga.length >= 2 ? (
                                <Chart
                                    chartType="Timeline"
                                    data={data_line_ga}
                                    options={options}
                                // width={"100%"}
                                // height={"400px"}
                                />
                            ) : (<p>No Data</p>)}
                        </fieldset>
                    </div>
                </div>
            </div>
            {/* )} */}
        </div >
    );
    // return(
    //     <div className="div-tags-cls">
    //         Hello
    //     </div>
    // );
};

export default Home;
