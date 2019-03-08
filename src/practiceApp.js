class ProgressApp extends React.Component {
     constructor(props) {
          super(props);
          this.toDoOnClickFunction = this.toDoOnClickFunction.bind(this);
          this.doneOnClickFunction = this.doneOnClickFunction.bind(this);
          this.addGoalFunction = this.addGoalFunction.bind(this);
          this.deleteSingleElement = this.deleteSingleElement.bind(this);
          this.deleteSingleAchieved = this.deleteSingleAchieved.bind(this);
          this.state = {
               toDoTasks : [],
               doneTasks : [],
          }
     }
     toDoOnClickFunction(element) {
          this.setState((prevState) => {
               let k = prevState.doneTasks;
               k.push(element);
               return {
                    toDoTasks : prevState.toDoTasks.filter((x) => x !== element),
                    doneTasks : k
               };
          });
     }
     doneOnClickFunction(element) {
          this.setState((prevState) => {
               let newStateToDo = prevState.toDoTasks;
               newStateToDo.push(element);
               return {
                    toDoTasks : prevState.toDoTasks,     
                    doneTasks : prevState.doneTasks.filter((x) => x !== element)
                    };
          });
     }
     addGoalFunction(inputValue) {
          this.setState((prevState) => {
               let newInput = prevState.toDoTasks;
               newInput.push(inputValue);
               return {
                    toDoTasks : newInput
               }
          })
     }
     deleteSingleElement(elem, indx) {
          this.setState((prevState) => {
               return {
                    toDoTasks : prevState.toDoTasks.filter((x) => x !== elem)
               }
          })
     }
     deleteSingleAchieved(elem, indx) {
          console.log(elem + indx);
          this.setState((prevState) => {
               return {
                    doneTasks : prevState.doneTasks.filter((x) => x !== elem)
               }
          })
     }
     componentDidMount() {
          this.setState((prevState) => {
               return JSON.parse(localStorage.getItem('appData'))
          })
     }
     componentDidUpdate() {
          localStorage.setItem('appData',JSON.stringify(this.state));
     }

     render() {
          const title = 'Progress App';
          const toDo = 'Goals';
          const Done = 'Achieved';
          return (
               <div>
                    <h1>{title}</h1>
                    <br></br>
                    <StillToDoList toDoOnClickFunction={this.toDoOnClickFunction} title={toDo} toDoTasks={this.state.toDoTasks} deleteElement={this.state.deleteElement} deleteSingleElement={this.deleteSingleElement}/>
                    <br></br>
                    <DoneList title={Done} doneTasks={this.state.doneTasks} doneOnClickFunction={this.doneOnClickFunction} deleteSingleAchieved={this.deleteSingleAchieved}/>
                    <br></br>
                    <DataEdit addGoalFunction={this.addGoalFunction} toDoTasks={this.state.toDoTasks} doneTasks={this.state.doneTasks}/>
               </div>
               )
     }
}

class StillToDoList extends React.Component {
     constructor(props) {
          super(props);
          this.onMouseEnter = this.onMouseEnter.bind(this);
          this.state = {
               index : -1,
          }
     }
     onMouseEnter(elem,indx) {
          this.setState((prevState) => {
               return {
                    index : indx,
               }
          })
     }
     singleElemementDeleteButtonClicked(elem, indx) {
          this.props.deleteSingleElement(elem,indx);
     }

     render() {
          return (
          <div>
               <h3>{this.props.title}</h3>
               {this.props.toDoTasks.map((elem,indx) => {
                    return ( 
                         <div key={indx + 1}>
                              <p key={indx} onClick={() => this.props.toDoOnClickFunction(elem)} onMouseEnter={() => this.onMouseEnter(elem,indx)}>{elem + '  '}</p>
                              {this.state.index === indx ? <button onClick={() => this.singleElemementDeleteButtonClicked(elem,indx)}>del</button> : <br></br>}
                         </div>
                    )
               })}
          </div>
     )
     }
     }

class DoneList extends React.Component {
     constructor(props) {
          super(props);
          this.onMouseEnter = this.onMouseEnter.bind(this);
          this.state = {
               index : -1
          }
     }
     onMouseEnter(elem, indx) {
          this.setState((prevState) => {
               return {
                    index : indx
               }
          })
     }
     render() {
          return (
               <div>
                    <h3>{this.props.title}</h3>
                    {this.props.doneTasks.map((elem,indx) => {
                         return (
                              <div key={indx}>
                                   <p onMouseEnter={() => this.onMouseEnter(elem, indx)} key={indx} onClick={() => this.props.doneOnClickFunction(elem)}>{elem}</p>
                                   {this.state.index == indx ? <button onClick={() => this.props.deleteSingleAchieved(elem, indx)}>del</button> : <br></br>}
                              </div>
                         )
                    })}
               </div>
          )
     }
}


class DataEdit extends React.Component {
     constructor(props) {
          super(props);
          this.clickedAdd = this.clickedAdd.bind(this);
          this.state = {
               error : false
          }
     }
     clickedAdd(e) {
          e.preventDefault();
          let inputValue = document.getElementById('input').value;
          if (this.props.toDoTasks.indexOf(inputValue ) < 0 && this.props.doneTasks.indexOf(inputValue) < 0) {
               this.setState(() => ({ error : false }));
               this.props.addGoalFunction(inputValue);
               document.getElementById('input').value = '';
          } else {
               this.setState(() => ({ error : true }));
          }
     }
     render() {
          return(
               <div>
                    <form onSubmit={this.clickedAdd}>
                         <input type='text' id='input'></input>
                         <button >Button</button>
                    </form>
                    {this.state.error && <p>That goal already exists.</p>}
               </div>
          )
     }
}

ReactDOM.render(<ProgressApp />, document.getElementById('app'));