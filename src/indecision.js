const app = {
     title: 'Indecision App',
     subtitle: 'Let computers decide',
     options: [] 
};

const onFormsubmit = (e) => {
     e.preventDefault();
     const input = e.target.elements.option.value;
     if(input) {
          app.options.push(input);
     };
     e.target.elements.option.value = '';
     renderApp();
};

const removeAll = () => {
     app.options = [];
     renderApp();
};

let chosenTask;
let clicked = false;

const pickTask = () => {
     const choiceArrayIndex = Math.floor(Math.random() * app.options.length);
     chosenTask = app.options[choiceArrayIndex];
     clicked = true;
     renderApp();
};

const appRoot = document.getElementById('app');

const renderApp = () => {
     const template = (
          <div>
               <h1>{app.title}</h1>
               {app.subtitle && <p>{app.subtitle}</p>}
               <p>{app.options.length > 0 ? 'Here are your options' : 'You have no options. Eat cake instead.'}</p>
               <p>{app.options.length}</p>
               <ol>
                    {app.options.map((x) => <li key={x}>{x}</li>)}
               </ol>
               <form onSubmit={onFormsubmit}>
                    <input type='text' name='option'/>
                    <button type='submit'>Add option</button>
               </form>
               <button onClick={removeAll}>Remove All</button>
               <p>What should I do?</p>
               <button disabled={app.options.length === 0} onClick={pickTask}>Pick a task for me</button>
               {chosenTask && clicked ? <p>{chosenTask}</p> : clicked == false ? <p></p> : app.options == 0 && clicked ? <p>You have no options!</p> : ''}
          </div>
     )
     
     ReactDOM.render(template, appRoot); 
};

renderApp();

