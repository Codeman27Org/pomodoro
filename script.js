const clockObject = {clockStopped: true, lastRun:'session', timer: null};

function setMiddleTimer(time){
  $('#middle-timer').text(time);
}

function clockFill(timeInSeconds){
  let sessionTimeSeconds = parseInt($('#session-number').text()) * 60;
  let breakTimeSeconds = parseInt($('#break-number').text()) * 60;
  let percentage=0;
  let col1="";
  let col2="#585858";
  let t=document.getElementById('clock');
  if(clockObject.lastRun == 'session'){
    col1="green";
    percentage = Math.round(100 - (timeInSeconds / sessionTimeSeconds) * 100);
  }
  else{
    col1="red";
    percentage = Math.round(100 - (timeInSeconds / breakTimeSeconds) * 100);
  }
  if(timeInSeconds === 'clear'){
    percentage = 0;
  }
  t.style.background = `linear-gradient(to top, ${col1} ${percentage}%, ${col2} 0%)`;
}

function countDown(time){
  const timeArr = time.split(':');
  let minute = timeArr[0];
  let second = timeArr[1];
  if(second == undefined){
    second = '00';
  }
  else if(parseInt(second) == 0){
    if(minute > 0){
      minute = parseInt(minute) - 1;
      second = 59;
    }
    else{
      if(clockObject.lastRun == 'session'){
        setMiddleTimer($('#break-number').text() + ':00');
        clockObject.lastRun = 'break';
        clockFill('clear');
      }
      else{
        setMiddleTimer($('#session-number').text() + ':00');
        clockObject.lastRun = 'session';
        clockFill('clear');
      }
      return;
    }
  }
  else{
    second = parseInt(second) - 1;
    if(parseInt(second) <= 9){
      second = `0${second}`;
    }
  }
  setMiddleTimer(`${minute}:${second}`);
  clockFill(`${(minute * 60) + second}`);
}

$(document).ready(function(){
  setMiddleTimer($('#session-number').text()); 
  
  $('#session-plus').on('click', function(){
    if(clockObject.clockStopped === true){
      let sessionLength = parseInt($('#session-number').text()) + 1;
      $('#session-number').text(sessionLength);
      setMiddleTimer($('#session-number').text());
      clockFill('clear');
    }
  });
  //No session lengths less that one and clock must be stopped
  $('#session-minus').on('click', function(){
    if(parseInt($('#session-number').text()) > 1 && clockObject.clockStopped === true){
      let sessionLength = parseInt($('#session-number').text()) - 1;
      $('#session-number').text(sessionLength);
      setMiddleTimer($('#session-number').text());
      clockFill('clear');
    }
  }); 
  $('#break-plus').on('click', function(){
    if(clockObject.clockStopped === true){
      let breakLength = parseInt($('#break-number').text()) + 1;
      $('#break-number').text(breakLength);
      clockFill('clear');
    }
  });
  //No break lengths less than one
  $('#break-minus').on('click', function(){
    if(parseInt($('#break-number').text()) > 1 && clockObject.clockStopped === true){
      let breakLength = parseInt($('#break-number').text()) - 1;
      $('#break-number').text(breakLength);
      clockFill('clear');
    }
  });
  
  //Start and stop the clock
  $('#clock').on('click', function(){
    if(clockObject.clockStopped === true){
      clockObject.timer = setInterval(function(){countDown($('#middle-timer').text())}, 1000);
      clockObject.clockStopped = false;
    }
    else{
      clearInterval(clockObject.timer); 
      clockObject.clockStopped = true;
    }  
  });
});



