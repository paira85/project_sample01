import react , {useState , useEffect} from "react";
import axios from "axios";
//datatable ,
import {Table, Popconfirm, Button , Space , Form} from "antd";
//널체크
import {isEmpty} from "lodash";

const DataTable = () => {

    const [gridData,setGridData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [editingKey, setEditingKey] = useState("");
    const [editRow, setEditRow] = useState(false);

    useEffect(()=>{
        loadData();
    }, [])

    //데이터 로딩
    const loadData =async () =>{
        setLoading(true)
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments")
        setGridData(response.data);
        setLoading(false);
    }

    // console.log("gridData",gridData);
    //삭제
    const handleDelete = (value) => {
        const dataSource = [...modifyData];
        const filterData = dataSource.filter( item => item.id !== value.id);
        setGridData(filterData);
    }

    const save = () =>{

    }

    const edit = () =>{
        
    }

    //원본 데이터를 key , comment 추가
    const modifyData = gridData.map( ({body, ...item}) => (
        {
        ...item,
        key:item.id,
        // comment: body
        //body 값이 없는 경우 재 정의.. 왜이렇게 하는걸까..
        comment: isEmpty(body) ? item.comment : body
        }
    ))
    // console.log('modifyData ' , modifyData)

    //컬럼
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
            render: (_,record) => {
                //custom button
                return modifyData.length >=1 ? 
                (
                    <Space>
                        <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() =>handleDelete(record)}>
                            <Button type="primary" danger>
                                Delete
                            </Button>
                        </Popconfirm>
                                           
                        {editRow ?  (
                                <span>
                                    <Button onClick={(e) => console.log(e)}
                                        type="primary"
                                        style={{maringRight:8}}
                                    >Save
                                    </Button>
                                    <Popconfirm
                                        title="Sure to Cancle?"
                                        onConfirm={()=> setEditRow(false)}
                                    ><Button>Cancle</Button>
                                    </Popconfirm>
                                </span>
                            ) : (
                                <Button onClick={ () => setEditRow(true)}
                                    type="primary"
                                >Edit
                                </Button>
                            )
                        }
                    </Space>
                ): null
            }
        }
    ]

    const isEditing = (record) =>{
        return record.key === editingKey;
    }

    const mergedColumns = columns.map( (col) =>{
        if (!col.editable){
            return col
        }
        return{
            ...col,
            onCell : (record) => ({
                record,
                dataIndex: col.dataIndex,
                title : col.title,
                editing : isEditing(record),
            })
        }
    });

    return (
        <div>
            <Table columns={mergedColumns}
            dataSource={modifyData}
            bordered
            loading={loading}
            />
        </div>
    )
}

export default DataTable;