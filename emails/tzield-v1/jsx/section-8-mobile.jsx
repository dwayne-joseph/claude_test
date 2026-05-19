const imgRectangle = "https://www.figma.com/api/mcp/asset/0f6dc705-1982-4ffa-b29e-48b9c64d6fa8";
const imgOval = "https://www.figma.com/api/mcp/asset/42031761-44cf-430f-923d-c82c535ec494";

export default function ContentModules() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center py-[12px] relative size-full" data-node-id="40000030:448" data-name="CONTENT MODULES">
      <div className="content-stretch flex items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="I40000030:448;218:2513">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Arial:Bold',sans-serif] leading-[0] min-w-px not-italic relative text-[#0023c8] text-[30px]" data-node-id="I40000030:448;218:2514">
          <span className="leading-[34px]">TZIELD has expanded across the following stages of the T1D disease continuum</span>
          <span className="leading-[34px] text-[19.35px]">1</span>
        </p>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[24px] items-center overflow-clip p-[24px] relative shrink-0 w-full" data-node-id="I40000030:448;218:2515">
        <div className="overflow-clip relative shrink-0 size-[110px]" data-node-id="I40000030:448;218:2516" data-name="Frame">
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:448;218:2517" data-name="Rectangle">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgRectangle} />
            </div>
          </div>
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:448;218:2519" data-name="Oval">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgOval} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[30px] items-center justify-center pl-[24px] relative shrink-0 w-full" data-node-id="I40000030:448;218:2522">
          <p className="[word-break:break-word] font-['Arial:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#414042] text-[20px] w-full" data-node-id="I40000030:448;218:2523">
            APPROVED in Stage 2 T1D
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[24px] items-center overflow-clip p-[24px] relative shrink-0 w-full" data-node-id="I40000030:448;218:2525">
        <div className="overflow-clip relative shrink-0 size-[110px]" data-node-id="I40000030:448;218:2526" data-name="Frame">
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:448;218:2527" data-name="Rectangle">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgRectangle} />
            </div>
          </div>
          <div className="absolute inset-[0.45%]" data-node-id="I40000030:448;218:2529" data-name="Oval">
            <div className="absolute inset-[-0.46%]">
              <img alt="" className="block max-w-none size-full" src={imgOval} />
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Arial:Bold',sans-serif] leading-[normal] left-[17.39%] not-italic right-[17.15%] text-[#ff00b7] text-[30px] top-[calc(50%-17px)] whitespace-nowrap" data-node-id="I40000030:448;218:2531">
            ​
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[30px] items-center justify-center pl-[24px] relative shrink-0 w-full" data-node-id="I40000030:448;218:2532">
          <p className="[word-break:break-word] font-['Arial:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#414042] text-[20px] w-full" data-node-id="I40000030:448;218:2533">
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
