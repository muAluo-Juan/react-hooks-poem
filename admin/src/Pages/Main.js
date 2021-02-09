/**路由文件 */
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main(){
    return (
        // 路径形式访问
        <Router>
            <Route path="/" exact component={Login}/>
            <Route path="/index/" component={AdminIndex}/>
        </Router>
    )
}

export default Main