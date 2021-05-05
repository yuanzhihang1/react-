import logo from './logo.svg';
import './App.css';
import React ,{Component} from 'react'
// function App() {
//   return (
//     <div className="App">
     
//     </div>
//   );
// }

const checkGame = function(game){
  //game = [null,null]
  var arr=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
 ]
 for(let i = 0;i<arr.length;i++){
  //  var index_1 = arr[i][0]
  //  var index_2 = arr[i][1]
  //  var index_3 = arr[i][2]
let [index_1,index_2,index_3]  = arr[i]
   if(game[index_1] !== null && game[index_1] === game[index_2] && game[index_2] === game[index_3] ){
     return game[index_1]
   }
   
 }
 return false
}

//游戏的历史记录
class History extends Component{
  render(){
    console.log('props in History',this.props)
    //b标题展示内容的表示
    const{xIsNext , winner,history,jump}=this.props
    let title=''
if(winner){
  title=`胜利者 是  ${winner}`
}else{
  if(xIsNext){
    title=`下一步 是 "X"`
  }else{
    title=`下一步是 "O"`
  }
}
    return(
      <div className="history">
      <h3>{title}</h3>
      <hr/>
      {/* {渲染历史记录} */}
      <ul>
      {
        history.map((value,key)=>{
          return(
                <li key={key}>
                  <button type="button" onClick={()=>jump(key) }>
                    跳到游戏 #{key}
                  </button>
                </li>
          )
        })
      }
      </ul>
      
      </div>
    )
   
     }
}
//游戏的格子
class Square extends Component{
  render(){
    return(
      <div className="box"
      onClick={this.props.handleClick}
      >
   {this.props.index}
      </div>
    )
   
     }
}
//游戏的面板
class Board extends Component{
 
  //方便生成统一的组件square
  //给组件传递参数，显示状态
  getSquare(i){
    const {game,handleClick} =this.props
    return(
      <Square index={game[i]} 
               handleClick = {()=>handleClick(i)}
      >

      </Square>
    )
  }
 

  render(){
    
    return(
      <div className="box-wrap">
        {/* {生成9个square} */}
      {this.getSquare(0)}
      {this.getSquare(1)}
      {this.getSquare(2)}
      {this.getSquare(3)}
      {this.getSquare(4)}
      {this.getSquare(5)}
      {this.getSquare(6)}
      {this.getSquare(7)}
      {this.getSquare(8)}
      </div>
    )
   
     }
}
//整体游戏容器，维护游戏状态
class Game extends Component{
  constructor(){
    super()
    this.state = {
      // game:Array(9).fill(null),
      history:[
        Array(9).fill(null)
      ],
      xIsNext :true,
      nowStep:0

    }
  }
  handleClick(i){
    //告诉我你点击了哪个小方块
   const{xIsNext,nowStep} = this.state

   let {history} = this.state

   history=history.slice(0,nowStep+1)


   //浅复制  避免引用类型导致一个对象反复被修改
   let game = history[nowStep].slice()
// console.log(i)

//游戏是否已经有赢家
if(checkGame(game)){
  return
}


   //i这个位置是否被点击过
   if(game[i]){
     return
   }
   //下一个玩家是x么
if(xIsNext){
game[i] = 'X'
}else{
  game[i] = 'O'
}



this.setState({
  history:history.concat([game]),
  xIsNext: !xIsNext,
  nowStep:nowStep+1
})
}
jump(i){
  var xIsNext= i% 2 === 0?true:false
  let nowStep = i
  this.setState({
    xIsNext:xIsNext,
    nowStep:nowStep

  })
}

  render(){
    const{history,xIsNext,nowStep}=this.state
    const game = history[nowStep]
    return(
      <div className="game">
       <Board game={game} handleClick={(index)=>this.handleClick(index)}>

       </Board>
       <History jump={(i)=>this.jump(i)} history={history} xIsNext={xIsNext} winner={checkGame(game)}>

       </History>
      </div>
    )
   
     }
}
class App extends Component{
  render(){
 return(
   <Game>

   </Game>
 )

  }
}
export default App;
