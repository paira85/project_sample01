import logo from './logo.svg';
import './App.css';
import DataTable from './DataTable';
import DataTable_dt from './DataTable_dt';
import {BrowserRouter , Routes , Route , Link} from 'react-router-dom';

function App() {
  return (    
    <div className="App">
      <BrowserRouter>
        <h4>Working with table in React JS</h4>
        <ul>
          <li><Link to="/" >main</Link></li>
          <li><Link to="/dataTable_antd" >antd</Link></li>
          <li><Link to="/dataTable_dt" >dt</Link></li>
        </ul>
        <Routes>
          <Route path="/dataTable_antd" element={<DataTable />}></Route>
          <Route path="/dataTable_dt" element={<DataTable_dt />}></Route>
        </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
