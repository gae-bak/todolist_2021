import React from 'react';
import './App.css';
import { TextField, Typography, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker} from '@material-ui/pickers';
import  SaveIcon  from '@material-ui/icons/Save';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      title: "",
      content: "",
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
    }
  }
  checkValidate(){
    const {
      title, content, startDate,
      startTime, endDate, endTime
    } = this.state;
    if(!title || !content || !startDate || !startTime || !endDate || !endTime){
      return false
    }
    return true
  }

  checkValidate2(){ // 2번 눌렀을 때 동작 ..
    const { startDate, endDate } = this.state;
    if(startDate.isAfter(endDate)) {
      alert("날짜 설정을 다시 해주세요!!");
      this.setState({startDate: null, endDate: null});
    }
    return true
  }
  checkValitime(){ //2번 눌렀을 때 동작 ..
   const { startDate, endDate, startTime, endTime } = this.state;
  if(startDate.isSame(endDate)) {
    if(startTime.isAfter(endTime)) {
      alert("시간 설정을 다시 해주세요!!");
      this.setState({startTime: null, endTime: null});
    }
  }
  return true

  }

  saveTodoList(){
    if(this.checkValidate()){
     {
      const { todoList, title, content, startDate, startTime, endDate, endTime } = this.state;
      todoList.push({title: title.trim(), content: content.trim(), startDate, startTime, endDate, endTime});
      this.setState({ 
        todoList,
        // title: "",
        // content: "",
        // startDate: null,
        // startTime: null,
        // endDate: null,
        // endTime: null,
      });
    }
    }else{
      alert("입력값을 확인해 주세요.");
    }
  }
    

  render() {
    return (
      <div className="App">
        <div className="header">TODO LIST</div>
        <div className="input_area">
          <TextField label="제목" size="normal" margin="normal" fullWidth required
            value={this.state.title}
            onChange={(e)=> this.setState({title:e.target.value})}
          />
          <TextField label="상세내용" size="normal" margin="normal" fullWidth multiline
            value={this.state.content}
            onChange={(e)=> this.setState({content:e.target.value})}
            />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/DD"
            margin="normal"
            label="시작 예정일"
            value={this.state.startDate}
            onChange={(value)=>{ this.setState({startDate:value})}}
            style={{width: '50%'}}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />  
          <KeyboardTimePicker
            margin="normal"
            label="시작시간"
            variant="inline"
            value={this.state.startTime}
            onChange={(value)=>{this.setState({startTime:value})}}
            style={{width: '50'}}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/DD"
            margin="normal"
            label="종료 예정일"
            value={this.state.endDate}
            onChange={(value)=> {
                      const { startDate, endDate } = this.state;
                      this.setState({endDate:value});
                      this.checkValidate2();
                    }} 
            style = {{width: '50%'}}     
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            label="종료시간"
            variant="inline"
            value={this.state.endTime}
            onChange={(value)=> {
               const { startDate, endDate, startTime, endTime } = this.state;
               this.setState({endTime:value})
               this.checkValitime();
              }} 
            style = {{width: '50%'}}   
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            style={{float:'right'}}
            onClick={()=>this.saveTodoList()}
            >
              Save
            </Button>
        </div>
        <div className="list_area">
          <List>
            {this.state.todoList.map((todoItem, idx) => {
              const {
                title, content, startDate, startTime, endDate, endTime
              } = todoItem;
              return (
                <ListItem key={idx} role={undefined} dense button>
                  <ListItemText
                    primary={title}
                    secondary={startDate?.format('yyyy-MM-DD')+' '+startTime?.format('HH:MM')+' ~ '+endDate?.format('yyyy-MM-DD')+' '+endTime?.format('HH:MM')}
                  />
                </ListItem>
              )
            })}
          </List>
        </div>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © 박웅서 '+new Date().getFullYear()+'.'}
        </Typography>
      </div>
    );
  }
}

export default App;
