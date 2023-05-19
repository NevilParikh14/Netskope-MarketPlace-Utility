import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Collapsible from 'react-collapsible';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Cto = () => {
	const ResultArea = styled.div`
	width: 100%;
	height: 100%;
	border: none;
	font-size: 13px;
	text-align: left;
	`;
	const [data, setdata] = useState([]);
	const [loading, setLoading] = useState(false);
    const onClick_refresh = () => {
        setLoading(true); fetch("/data", { mode: "no-cors" }).then((res) =>
            res.json().then((actualdata) => {
                setLoading(false);
                console.log(actualdata)
                setdata(actualdata.plugin);
                console.log(data);
            })
        );
    }
	useEffect(() => {
		onClick_refresh();
	}
		, []);
	const filterd_cto = data.filter(cto => cto.module === 'CTO');
	return (
		<div className='div-tags-cls'
		// style={{
		// 	display: 'flex',
		// 	height: '100vh'
		// }}
		>
			{loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
			<div id="customers">
				<tbody>
					<tr>
						<th style={{ "width": "5%" }}>Module</th>
						<th style={{ "width": "10%" }}>Name</th>
						<th style={{ "width": "5%" }}>Version</th>
						<th style={{ "width": "50%" }}>Release Notes</th>
						<th style={{ "width": "5%" }}>Beta Date</th>
						<th style={{ "width": "5%" }}>GA Date</th>
					</tr>
					{filterd_cto.sort((a, b) => a.plugin_name < b.plugin_name ? -1 : 1,).map((item, index) => (
						<tr key={index}>
							<td style={{ "width": "5%" }}>{item.module}</td>
							<td style={{ "width": "10%" }}><b><u>{item.plugin_name}</u></b> (<i>{item.folder}</i>)</td>
							<td style={{ "width": "5%" }}>{item.version}</td>
							<td style={{ width: "50%" }}><ResultArea><ReactMarkdown>{item.release_notes}</ReactMarkdown><Collapsible close trigger="> Old Releases"><ReactMarkdown>{item.more_release_notes}</ReactMarkdown></Collapsible></ResultArea></td>
							<td style={{ "width": "5%" }}>{item.beta}</td>
							<td style={{ "width": "5%" }}>{item.ga}</td>
						</tr>
					))}
				</tbody>
			</div>)}
		</div>
	);
};

export default Cto;
