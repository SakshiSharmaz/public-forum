import React from "react";
import "../css/helper.css";

export default function DataGrid(props) {



    console.log(props.rows)
    console.log(props.columns)



    return <div>
        <table>

            <thead >

                <tr>
                    {props.columns.map(function (object, i) {
                        return <th> {object.headerName} </th>;
                    })}
                </tr>
            </thead>
            <tbody>


                {props.rows.map(function (object, i) {
                    return <tr key={object.id}>
                        <td style={{ 'width': '40px' }}  >{object.id}</td>
                        <td style={{ 'width': '500px' }} >{object.title}</td>
                        <td style={{ 'width': '200px' }} >{object.createdBy}</td>
                        <td style={{ 'width': '100px' }} >{object.createdAt}</td>
                    </tr>;
                })}


            </tbody>

        </table>
    </div>


}