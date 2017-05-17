var posts = [{header: "This is a Title", content: "This is Quality Content Yo"}] // comment out in production
//var posts = []

class App extends React.Component {
    render() {
      return(
        <div className="container">
          <h1>Welcome to the Best Social Media Site Ever</h1>
          <div className="row">
            <div className="col s6">
              <h4>Write Posts Here</h4>
              <TextForm handler={this}/>
            </div>
            <div className="col s6">
              {
                posts.map(function(p){
                  return <Post data={p} />
                })
              }
            </div>
          </div>
          </div>
          )
       }
        
       shouldComponentUpdate() {
           var newPosts = pullFromServer()
           if(!newPosts) {
               return false
           }
           else {
               posts = newPosts
               return true
           }
           console.log('checking')
       }
   }

class Post extends React.Component {
  render() {
    return (
      <div className='post'><div className='container'>
        <h5>{this.props.data.header}</h5>
        <p>{this.props.data.content}</p></div>
      </div>)
  }
}

class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }
  
  handleHeaderChange(event) {
    this.setState({header: event.target.value});
  }

  handleSubmit(event) {
	posts.push({header: this.state.header, content: this.state.content})
    this.props.handler.forceUpdate()
    
    //firebase
    pushToServer(this.state.header, this.state.content)
    
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

          <input placeholder="Post Header" id="first_name" type="text" value={this.state.header} onChange={this.handleHeaderChange} className="validate" />
            <br />
        <label>

          <textarea className="materialize-textarea" type="text" value={this.state.content} onChange={this.handleContentChange} placeholder="Post Content"/>
        </label><br />
        <input className="waves-effect waves-light btn" type="submit" value="Submit" />
      </form>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))

function pullFromServer() {
    /*
    if data exists 
        return [posts]
    else
        return false
    */
    return false
}
function pushToServer(h, c) {
    var post = {header: h, content: c}
    
}