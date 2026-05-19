const imgRectangle = "https://www.figma.com/api/mcp/asset/a36edd37-5cbb-4685-ba2c-0614b8321f1d";
const imgOval = "https://www.figma.com/api/mcp/asset/c4b43365-9db6-48d0-a78a-ee3622e5bd1d";

export default function ContentModules() {
  return (
    <div style={{alignContent: "stretch", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", justifyContent: "center", paddingTop: "12px", paddingBottom: "12px", position: "relative", width: "100%", height: "100%"}} data-node-id="40000030:448" data-name="CONTENT MODULES">
      <div style={{alignContent: "stretch", display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "24px", paddingRight: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:448;218:2513">
        <p style={{wordBreak: "break-word", flex: "1 0 0", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "0", minWidth: "1px", fontStyle: "normal", position: "relative", color: "#0023C8", fontSize: "30px"}} data-node-id="I40000030:448;218:2514">
          <span style={{lineHeight: "34px"}}>TZIELD has expanded across the following stages of the T1D disease continuum</span>
          <span style={{lineHeight: "34px", fontSize: "19.35px"}}>1</span>
        </p>
      </div>
      <div style={{backgroundColor: "#FFFFFF", alignContent: "stretch", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", overflow: "clip", padding: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:448;218:2515">
        <div style={{overflow: "clip", position: "relative", flexShrink: "0", width: "110px", height: "110px"}} data-node-id="I40000030:448;218:2516" data-name="Frame">
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:448;218:2517" data-name="Rectangle">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgRectangle} />
            </div>
          </div>
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:448;218:2519" data-name="Oval">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgOval} />
            </div>
          </div>
        </div>
        <div style={{alignContent: "stretch", display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", justifyContent: "center", paddingLeft: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:448;218:2522">
          <p style={{wordBreak: "break-word", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "28px", fontStyle: "normal", position: "relative", flexShrink: "0", color: "#414042", fontSize: "20px", width: "100%"}} data-node-id="I40000030:448;218:2523">
            APPROVED in Stage 2 T1D
          </p>
        </div>
      </div>
      <div style={{backgroundColor: "#FFFFFF", alignContent: "stretch", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", overflow: "clip", padding: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:448;218:2525">
        <div style={{overflow: "clip", position: "relative", flexShrink: "0", width: "110px", height: "110px"}} data-node-id="I40000030:448;218:2526" data-name="Frame">
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:448;218:2527" data-name="Rectangle">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgRectangle} />
            </div>
          </div>
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:448;218:2529" data-name="Oval">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgOval} />
            </div>
          </div>
          <p style={{wordBreak: "break-word", position: "absolute", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "normal", left: "17.39%", fontStyle: "normal", right: "17.15%", color: "#FF00B7", fontSize: "30px", top: "calc(50% - 17px)", whiteSpace: "nowrap"}} data-node-id="I40000030:448;218:2531">
            ​
          </p>
        </div>
        <div style={{alignContent: "stretch", display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", justifyContent: "center", paddingLeft: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:448;218:2532">
          <p style={{wordBreak: "break-word", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "0", fontStyle: "normal", position: "relative", flexShrink: "0", color: "#414042", fontSize: "20px", width: "100%"}} data-node-id="I40000030:448;218:2533">
            <span style={{lineHeight: "28px", color: "#FF00B7"}}>[</span>
            <span style={{lineHeight: "28px"}}>NOW</span>
            <span style={{lineHeight: "28px", color: "#FF00B7"}}>]</span>
            <span style={{lineHeight: "28px"}}>{` APPROVED in Stage 3 T1D within `}</span>
            <span style={{lineHeight: "28px", color: "#FF00B7"}}>[</span>
            <span style={{lineHeight: "28px"}}>6-12 weeks</span>
            <span style={{lineHeight: "28px", color: "#FF00B7"}}>]</span>
            <span style={{lineHeight: "28px"}}>{` of diagnosis`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
