class App extends React.Component {
    constructor(props){
        super(props);

        this.state={
            name:"ff",
            id:"",
            pw:"",
            email:""
        }
    }
    render(){
        return(
            <div id='app'>
                <h1>회원가입 입력 폼 (연습)</h1>
                <form>
                    <div style={{marginBottom:'5px'}}>
                        <input type="text" placeholder="이름을 입력하세요" defaultValue={this.state.name}/>
                    </div>
                    <div style={{marginBottom:'5px'}}>
                        <input type="text" placeholder="아이디를 입력하세요" defaultValue={this.state.id}/>
                    </div>
                    <div style={{marginBottom:'5px'}}>
                        <input type="password" placeholder="비밀번호를 입력하세요" defaultValue={this.state.pw} autoComplete="off" />
                    </div>
                    <div style={{marginBottom:'5px'}}>
                        <input type="text" placeholder="이메일을 입력하세요" defaultValue={this.state.email}/>
                    </div>
                    <div style={{marginBottom:'5px'}}>
                        <button type="submit">전송</button>
                    </div>
                </form>
                <MemberComponent/>
            </div>
        );
    }
}




class MemberComponent extends React.Component {
    render() {
        return (
          <div id="list">
            <table style={{border:'1px solid #000',borderCollapse:'collapse',width:'500px',padding:'20px'}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid #000'}}>번호</th>
                        <th style={{border:'1px solid #000'}}>이름</th>
                        <th style={{border:'1px solid #000'}}>아이디</th>
                        <th style={{border:'1px solid #000'}}>비밀번호</th>
                        <th style={{border:'1px solid #000'}}>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {/*  */}
                </tbody>
            </table>
          </div>  
        );
    }
}
const styleInput={
    width:'200px',
    height:'30px',
    padding:'5px 10px',
    marginBottom:'5px',
    boxSizing:'border-box'
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

