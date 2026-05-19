const imgFrame12 = "https://www.figma.com/api/mcp/asset/7f9f9c67-5ace-4a0f-adf5-7aafa2a7e4bc";
const imgGroup2808 = "https://www.figma.com/api/mcp/asset/a79d4c2e-16eb-4ad8-981b-213375da87ec";
const imgGroup2809 = "https://www.figma.com/api/mcp/asset/1b236d27-e7b6-4556-8a35-f0a3aefe9e09";

export default function HeaderModules() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center pb-[12px] pt-[14px] relative size-full" data-node-id="40000030:444" data-name="HEADER MODULES">
      <div className="content-stretch flex flex-col items-start pb-[14px] pr-[10px] relative shrink-0" data-node-id="I40000030:444;218:2041">
        <div className="h-[16px] relative shrink-0 w-[60px]" data-node-id="I40000030:444;218:2042" data-name="New_SANOFI_Logo">
          <div className="absolute contents inset-0" data-node-id="I40000030:444;218:2043" data-name="Clip path group">
            <div className="absolute inset-[0.9%_-0.01%_-0.02%_-0.01%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.008px_-0.144px] mask-size-[60px_16px]" data-node-id="I40000030:444;218:2046" style={{ maskImage: `url('${imgGroup2808}')` }}>
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2809} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ff5000] h-[4px] relative shrink-0 w-full" data-node-id="I40000030:444;218:2055" />
      <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-full" data-node-id="I40000030:444;218:2056">
        <div className="content-stretch flex flex-col gap-[50px] items-start pb-[24px] relative shrink-0" data-node-id="I40000030:444;218:2057">
          <div className="content-stretch flex h-[90px] items-center justify-center relative shrink-0 w-[214px]" data-node-id="I40000030:444;218:2058">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFrame12} />
          </div>
          <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative shrink-0" data-node-id="I40000030:444;218:2060">
            <div className="[word-break:break-word] font-['Arial:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#0023c8] text-[16px] w-[201px] whitespace-pre-wrap" data-node-id="I40000030:444;218:2062">
              <p className="mb-0">
                <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[18px] underline">Read Indication and</span>
                <span className="leading-[18px]">
                  {` `}
                  <br aria-hidden="true" />
                </span>
                <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[18px] underline">Full Prescribing Information</span>
              </p>
              <p className="leading-[18px] mb-0">​</p>
              <p>
                <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[18px] underline">Full Prescribing Information</span>
                <span className="leading-[18px]">{`, `}</span>
                <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[18px] underline">including boxed WARNING</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center pb-[24px] px-[24px] relative shrink-0 w-full" data-node-id="I40000030:444;218:2063" data-name="PREHEADER">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Arial:Bold',sans-serif] leading-[23px] min-w-px not-italic relative text-[#0023c8] text-[19px]" data-node-id="I40000030:444;218:2064">
          INDICATIONS
        </p>
      </div>
      <div className="content-stretch flex items-center px-[24px] relative shrink-0 w-full" data-node-id="I40000030:444;218:2065" data-name="PREHEADER">
        <div className="[word-break:break-word] flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#414042] text-[16px]" data-node-id="I40000030:444;218:2066">
          <p className="leading-[20px] mb-0">TZIELD is a disease-modifying agent that preserves beta-cell function indicated:</p>
          <ul className="list-disc">
            <li className="mb-0 ms-[24px]">
              <span className="leading-[20px]">to delay the onset of Stage 3 type 1 diabetes (T1D) in adults and pediatric patients aged 8 years and older with Stage 2 T1D.</span>
            </li>
            <li className="ms-[24px]">
              <span className="leading-[20px]">to delay the progression of Stage 3 T1D in adults and pediatric patients 8 years and older recently diagnosed with Stage 3 T1D. This indication is approved under accelerated approval based on C-peptide as a marker of beta-cell preservation. Continued approval for this indication may be contingent upon verification and description of clinical benefit in confirmatory trials.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
