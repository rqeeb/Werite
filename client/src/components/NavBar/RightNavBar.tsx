

export function RightNavBar() {

  function clicekdk(){
    console.log("HELLO")
  }

  return <div style={{border:"2px solid red",display:"flex",gap:"20px"}}>
    <div>
      <button style={{backgroundColor:"transparent",color:"white"}}>HELLO</button>
    </div>
    <div onClick={clicekdk} style={{cursor:"pointer"}}>
      THREE
    </div>
    <div>
      FOUR
    </div>
  </div>;
}
