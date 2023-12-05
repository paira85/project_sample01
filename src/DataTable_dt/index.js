import react , {useState , useEffect, useRef} from "react";
import axios from "axios";
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';

export default function DataTable_dt() {
    const tableRef = useRef();
    
    const [gridData,setGridData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    console.log('isLoading' , isLoading);
    
    const get_data = async () =>{
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments")
        

        const modifyData = response.data.map( ({body, ...item}) => (
            {
            ...item,
            key:item.id,
            comment:body,
            actions:""
            }
        ))

        setGridData(modifyData);
        setIsLoading(true);
    }

    function get_grid(){
        return  $(tableRef.current).DataTable({
            // data : gridData,
            ajax :{
                type: 'GET',
                url: 'https://jsonplaceholder.typicode.com/comments',
                dataType: 'json',
                dataSrc: '',
            },
            columns:[
                {
                    title:"ID",
                    data:"id",
                },
                {
                    title:"Name",
                    data:"name",
                    align:"center",
                    editable:true
                },
                {
                    title:"Email",
                    data:"email",
                    align:"center",
                    editable:true
                },
                {
                    title:"Comment",
                    data:"body",
                    align:"center",
                    editable:true
                }
                ,
                {
                    title:'action',
                    data:null,
                    defaultContent: '<button>Click!</button>',
                    targets: -1
                }
            ],
            responsive: true, // 반응형 켜기
            scrollX: true,
            // options
        })

    }

    useEffect(() => {
        
        // get_data()
        const table =  get_grid();
        console.log('usereffect' , gridData)
  
        // 언마운트 시 destroy
        return () => {
             console.log('datatable_dt unmount' , table)
             table.destroy();
        };
    }, [isLoading]);
  
    return (
        <div>
            <table ref={tableRef} 
            class="table table-striped"
            style={{ width: '100%' }}>
            </table>
        </div>
    )
  }  