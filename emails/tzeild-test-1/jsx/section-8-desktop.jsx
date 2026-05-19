const imgRectangle = "https://www.figma.com/api/mcp/asset/7408a748-c79e-4201-9b9e-005ac97e6672";
const imgOval = "https://www.figma.com/api/mcp/asset/7e89cf7b-d619-4dc8-a542-7a4bcaaa281e";
const imgOval1 = "https://www.figma.com/api/mcp/asset/5aa418ca-230e-4e41-9a93-a9e8d316a86f";

export default function ContentModules() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center py-[12px] relative size-full" data-node-id="40000030:428" data-name="CONTENT MODULES">
      <div className="content-stretch flex items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="I40000030:428;218:2384">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Arial:Bold',sans-serif] leading-[0] min-w-px not-italic relative text-[#0023c8] text-[30px]" data-node-id="I40000030:428;218:2385">
          <span className="leading-[34px]">TZIELD has expanded across the following stages of the T1D disease continuum</span>
          <span className="leading-[34px] text-[19.35px]">1</span>
        </p>
      </div>
      <div className="content-stretch flex items-center overflow-clip p-[24px] relative shrink-0 w-full" data-node-id="I40000030:428;218:2386">
        <div className="overflow-clip relative shrink-0 size-[110px]" data-node-id="I40000030:428;218:2387" data-name="Frame">
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:428;218:2388" data-name="Rectangle">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgRectangle} />
            </div>
          </div>
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:428;218:2390" data-name="Oval">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgOval} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[30px] items-center justify-center min-w-px pl-[24px] relative" data-node-id="I40000030:428;218:2393">
          <p className="[word-break:break-word] font-['Arial:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#414042] text-[20px] w-full" data-node-id="I40000030:428;218:2394">
            APPROVED in Stage 2 T1D
          </p>
        </div>
      </div>
      <div className="content-stretch flex items-center overflow-clip p-[24px] relative shrink-0 w-full" data-node-id="I40000030:428;218:2396">
        <div className="overflow-clip relative shrink-0 size-[110px]" data-node-id="I40000030:428;218:2397" data-name="Frame">
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:428;218:2398" data-name="Rectangle">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgRectangle} />
            </div>
          </div>
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:428;218:2400" data-name="Oval">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgOval1} />
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Arial:Bold',sans-serif] leading-[normal] left-[17.39%] not-italic right-[17.15%] text-[#ff00b7] text-[30px] top-[calc(50%-17px)] whitespace-nowrap" data-node-id="I40000030:428;218:2402">
            ​
          </p>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[30px] items-center justify-center min-w-px pl-[24px] relative" data-node-id="I40000030:428;218:2403">
          <p className="[word-break:break-word] font-['Arial:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#414042] text-[20px] w-full" data-node-id="I40000030:428;218:2404">
            <span className="leading-[28px] text-[#ff00b7]">[</span>
            <span className="leading-[28px]">NOW</span>
            <span className="leading-[28px] text-[#ff00b7]">]</span>
            <span className="leading-[28px]">{` APPROVED in Stage 3 T1D within `}</span>
            <span className="leading-[28px] text-[#ff00b7]">[</span>
            <span className="leading-[28px]">6-12 weeks</span>
            <span className="leading-[28px] text-[#ff00b7]">]</span>
            <span className="leading-[28px]">{` of diagnosis`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
