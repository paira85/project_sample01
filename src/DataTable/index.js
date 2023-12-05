import react , {useState , useEffect} from "react";
import axios from "axios";
import {Table} from "antd";

const DataTable = () => {

    const [gridData,setGridData] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        loadData();
    }, [])

    const loadData =async () =>{
        setLoading(true)
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments")
        setGridData(response.data);
        setLoading(false);
    }

    // console.log("gridData",gridData);

    const modifyData = gridData.map( ({body, ...item}) => (
        {
        ...item,
        key:item.id,
        comment:body
        }
    ))
    // console.log('modifyData ' , modifyData)

    const columns = [
        {
            title:"ID",
            dataIndex:"id",
        },
        {
            title:"Name",
            dataIndex:"name",
            align:"center",
            editable:true
        },
        {
            title:"Email",
            dataIndex:"email",
            align:"center",
            editable:true
        },
        {
            title:"Comment",
            dataIndex:"comment",
            align:"center",
            editable:true
        },
        {
            title:"Actions",
            dataIndex:"actions",
            align:"center",            
        }
    ]
    return (
        <div>
            <Table columns={columns}
            dataSource={modifyData}
            bordered
            loading={loading}
            />
        </div>
    )
}

export default DataTable;