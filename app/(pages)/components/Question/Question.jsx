import React from 'react'

function Question({question}) {
    const {qid, title, answer} = question;
    const ClickHanlder = ()=>{
       const ans =  document.getElementById('answer');
       if(ans.style.display=="none"){
        ans.style.display="block";
       } else {
        ans.style.display="none";
       }
    }
  return (
    <>
    
    <div className="question">
    <div className="question_title">
       <span> Q. {qid} : </span> <span>{title}</span>
    </div>
    <div className="question_answer">
        {/* <button onClick={ClickHanlder}>Show</button> */}
        <div  id='answer'><span>Answer:</span> <span>{answer}</span></div>
    </div>
    </div>
    </>
  )
}

export default Question