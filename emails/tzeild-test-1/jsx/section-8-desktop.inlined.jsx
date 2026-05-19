const imgRectangle = "https://www.figma.com/api/mcp/asset/55c42927-80aa-4e7d-a950-85d787ef8ffd";
const imgOval = "https://www.figma.com/api/mcp/asset/956f7423-f6d4-4cd5-96ee-3ddd3cd3a733";
const imgOval1 = "https://www.figma.com/api/mcp/asset/89bb5f3d-daaf-49f0-bf9b-93557a125c50";

export default function ContentModules() {
  return (
    <div style={{alignContent: "stretch", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", justifyContent: "center", paddingTop: "12px", paddingBottom: "12px", position: "relative", width: "100%", height: "100%"}} data-node-id="40000030:428" data-name="CONTENT MODULES">
      <div style={{alignContent: "stretch", display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "24px", paddingRight: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:428;218:2384">
        <p style={{wordBreak: "break-word", flex: "1 0 0", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "0", minWidth: "1px", fontStyle: "normal", position: "relative", color: "#0023C8", fontSize: "30px"}} data-node-id="I40000030:428;218:2385">
          <span style={{lineHeight: "34px"}}>TZIELD has expanded across the following stages of the T1D disease continuum</span>
          <span style={{lineHeight: "34px", fontSize: "19.35px"}}>1</span>
        </p>
      </div>
      <div style={{alignContent: "stretch", display: "flex", alignItems: "center", overflow: "clip", padding: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:428;218:2386">
        <div style={{overflow: "clip", position: "relative", flexShrink: "0", width: "110px", height: "110px"}} data-node-id="I40000030:428;218:2387" data-name="Frame">
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:428;218:2388" data-name="Rectangle">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgRectangle} />
            </div>
          </div>
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:428;218:2390" data-name="Oval">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgOval} />
            </div>
          </div>
        </div>
        <div style={{alignContent: "stretch", display: "flex", flex: "1 0 0", flexDirection: "column", gap: "30px", alignItems: "center", justifyContent: "center", minWidth: "1px", paddingLeft: "24px", position: "relative"}} data-node-id="I40000030:428;218:2393">
          <p style={{wordBreak: "break-word", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "28px", fontStyle: "normal", position: "relative", flexShrink: "0", color: "#414042", fontSize: "20px", width: "100%"}} data-node-id="I40000030:428;218:2394">
            APPROVED in Stage 2 T1D
          </p>
        </div>
      </div>
      <div style={{alignContent: "stretch", display: "flex", alignItems: "center", overflow: "clip", padding: "24px", position: "relative", flexShrink: "0", width: "100%"}} data-node-id="I40000030:428;218:2396">
        <div style={{overflow: "clip", position: "relative", flexShrink: "0", width: "110px", height: "110px"}} data-node-id="I40000030:428;218:2397" data-name="Frame">
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:428;218:2398" data-name="Rectangle">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgRectangle} />
            </div>
          </div>
          <div style={{position: "absolute", inset: "0.45%"}} data-node-id="I40000030:428;218:2400" data-name="Oval">
            <div style={{position: "absolute", inset: "-0.46%"}}>
              <img alt="" style={{display: "block", maxWidth: "none", width: "100%", height: "100%"}} src={imgOval1} />
            </div>
          </div>
          <p style={{wordBreak: "break-word", position: "absolute", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "normal", left: "17.39%", fontStyle: "normal", right: "17.15%", color: "#FF00B7", fontSize: "30px", top: "calc(50% - 17px)", whiteSpace: "nowrap"}} data-node-id="I40000030:428;218:2402">
            ​
          </p>
        </div>
        <div style={{alignContent: "stretch", display: "flex", flex: "1 0 0", flexDirection: "column", gap: "30px", alignItems: "center", justifyContent: "center", minWidth: "1px", paddingLeft: "24px", position: "relative"}} data-node-id="I40000030:428;218:2403">
          <p style={{wordBreak: "break-word", fontFamily: "'Arial:Bold',sans-serif", lineHeight: "0", fontStyle: "normal", position: "relative", flexShrink: "0", color: "#414042", fontSize: "20px", width: "100%"}} data-node-id="I40000030:428;218:2404">
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
