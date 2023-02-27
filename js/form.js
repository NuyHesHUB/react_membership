

class App extends React.Component {
    constructor(props){
        super(props);
        this.inputRefId=React.createRef(); 
        this.state={
            num:1,/* number 추가 */
            id: "",
            name:"",
            pw:"",
            /* 밑에는 나중에 */
            members:[
                {
                    num:'',
                    id:'',
                    name:'',
                    pw:''
                }
            ],
            update:false
        }
    }
    onChangeName = (e) => {
        //console.log(e.target.value);
        this.setState({
            name:e.target.value 
        });
    }
    onChangeId = (e) => {
        //console.log(e.target.value);
        this.setState({
            id:e.target.value
        })
    }
    onChangePw = (e) => {
        //console.log(e.target.value);
        this.setState({
            pw:e.target.value
        })
    }
    /* onClickSubmit = (e) => {
        e.preventDefault();
        this.setState({
            member:[
                ...this.state.member,
                {
                    id:this.state.id,
                    name:this.state.name,
                    pw:this.state.pw
                }
            ]
        })
    } */
    onSubmitForm = (e) => {
        e.preventDefault();
        //한레코드 단위로 객체를 구성한다.
        let obj={
            num: this.state.num,
            id: this.state.id,
            name: this.state.name,
            pw: this.state.pw
        }
        //문자열로 변환하여 저장
        localStorage.setItem(this.state.num, JSON.stringify(obj))
        
        /* 2023-01-26 테이블에 바로 추가가 되지않아 추가함 */
        this.memberListLoad();

        //저장된 로컬스토리지 데이터 가져오는 방법
        //localStorage.getItem(키)=>value(값) 출력 //가져올때는 문자열을 다시 객체화 시켜서 가져와야함
        /* let i=0;
        console.log(localStorage.length);
        while(i<localStorage.length){
            i++;
            console.log(JSON.parse(localStorage.getItem(i)).num); //객체 형식으로 변환
            console.log(JSON.parse(localStorage.getItem(i)).id); //객체 형식으로 변환
            console.log(JSON.parse(localStorage.getItem(i)).name); //객체 형식으로 변환
            console.log(JSON.parse(localStorage.getItem(i)).pw); //객체 형식으로 변환
            
            //넣을때마다 ... 전개연산자
             this.setState({
                member: [JSON.parse(localStorage.getItem(i)), ...this.state.member]
            })
        } */



        /* this.setState({
            member:[
                ...this.state.member,
                {
                    id:this.state.id,
                    name:this.state.name,
                    pw:this.state.pw
                }
            ]
        }) */
        //초기화
        this.setState({
            num: localStorage.length+1,
            id:'',
            name:'',
            pw:'',
            update:false
        })
        this.inputRefId.current.focus();
    }
    /* 2023-01-26 */
    //시작하자 마자 가져오기 위해서 만듬
    memberListLoad= () => { 
        let member=[];
        for(let i=0; i<localStorage.length; i++){
            member.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        this.setState({
            members:member
        })
        let max=0;
        for(let i=0; i<localStorage.length; i++){
            if(max < Number(localStorage.key(i))){
                max = Number(localStorage.key(i))
            }
        }
        this.setState({num:max+1})
    }

    componentDidMount(){
        //console.log('3 생명주기 componentDidMount'); 
        
        /* 추가 */
        /* for(let i=1; i<localStorage.length; i++){
            this.setState({
                member: [...this.state.member, JSON.parse(localStorage.getItem(i))]
            })
        } */
        this.inputRefId.current.focus();
        /* 2023-01-26 */
        this.memberListLoad();
    }


    onClickDeletefn=(deletBun)=>{
        localStorage.removeItem(deletBun);
        this.memberListLoad();
    }

    onClickUpdatefn=(updateBun)=>{
        let imsiObj={}
        imsiObj=JSON.parse(localStorage.getItem(updateBun));

        this.setState({
            num:updateBun,
            id:imsiObj.id,
            name:imsiObj.name,
            pw:imsiObj.pw,
            update:true
        })
    }

    render() {
        //console.log('2 생명주기 render');
        return (
            <div id='app'>
                <h1 style={{color:'#f00',textAlign:'center'}}>회원가입 입력 폼</h1>
                <form onSubmit={this.onSubmitForm} action='member.php' method='post' name='member' id='member' >
                    <div>
                        <input style={styleInput} type="text" placeholder='아이디을 입력하세요' value={this.state.id} onChange={this.onChangeId} ref={this.inputRefId}/>
                    </div>
                    <div>
                        <input style={styleInput} type="text" placeholder='이름을 입력하세요' value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div>
                        <input style={styleInput} type="password" placeholder='비밀번호를 입력하세요' value={this.state.pw} onChange={this.onChangePw}/>
                    </div>
                    <div>
                        <button type="submit" style={{textAlign:'center',margin:'20px auto', width:'50px', padding:'5px 5px'}}>{this.state.update? '수정하기':'전송'}</button>
                    </div>
                </form>
                <MemberComponent members={this.state.members} onClickDeletefn={this.onClickDeletefn} onClickUpdatefn={this.onClickUpdatefn}/>
            </div>
        );
    }
}


class MemberComponent extends React.Component {
    //삭제
    onClickDelete = (e, bun) => {
        e.preventDefault();
        this.props.onClickDeletefn(bun)
    }
    //수정
    onClickUpdate = (e, bun) => {
        e.preventDefault();
        this.props.onClickUpdatefn(bun)
    }
    render() {
        //console.log(this.props.member);
        const memberList = this.props.members.map((item, idx) => {
            return(
                <tr key={idx+1} style={{textAlign:'center'}}>
                    <td style={{border:'1px solid #000',padding:'10px 5px'}}>{idx+1}</td>
                    <td style={{border:'1px solid #000',padding:'10px 5px'}}>{item.id}</td>
                    <td style={{border:'1px solid #000',padding:'10px 5px'}}>{item.name}</td>
                    <td style={{border:'1px solid #000',padding:'10px 5px'}}>{item.pw}</td>
                    <td style={{border:'1px solid #000',padding:'10px 5px'}}><button onClick={ (e) => {this.onClickUpdate(e, item.num)}}>수정</button></td>
                    <td style={{border:'1px solid #000',padding:'10px 5px'}}><button onClick={ (e) => {this.onClickDelete(e, item.num)}}>삭제</button></td>
                </tr>
            )
        });
        return (
            <div id="list">
                <table style={{border:'1px solid #000',borderCollapse:'collapse',width:'400px',padding:'20px'}}>
                    <thead>
                        <tr /* key={item.num} */>
                            <th style={{border:'1px solid #000'}}>번호</th>
                            <th style={{border:'1px solid #000'}}>아이디</th>
                            <th style={{border:'1px solid #000'}}>이름</th>
                            <th style={{border:'1px solid #000'}}>비밀번호</th>
                            <th style={{border:'1px solid #000'}}>수정</th>
                            <th style={{border:'1px solid #000'}}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList}
                    </tbody>
                </table>
            </div>
        );
    }
}

/* style지정 */                
const styleInput={
    width:'200px',
    height:'30px',
    padding:'5px 10px',
    marginBottom:'5px',
    boxSizing:'border-box'
}







ReactDOM.render(
    <App />,
    document.getElementById('root')
)