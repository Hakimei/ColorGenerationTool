import svgPaths from "./svg-ak60oe4wnp";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 14V9.33333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M2.66667 6.66667V2" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M8 14V8" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M8 5.33333V2" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M13.3333 14V10.6667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M13.3333 8V2" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M1.33333 9.33333H4" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M6.66667 5.33333H9.33333" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          <path d="M12 10.6667H14.6667" id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#030213] relative rounded-[8px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 tracking-[-0.9492px]">Lumina</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] h-[21px] relative rounded-[4px] shrink-0 w-[36.422px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[7px] not-italic text-[#030213] text-[10px] top-[3.5px] tracking-[0.1172px]">Beta</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[152.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container3 />
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[28px] items-center relative shrink-0" data-name="Container">
      <Container2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3b632b00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.055px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-px tracking-[0.6px] uppercase">Palettes</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[69.008px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[48.5px] not-italic text-[#0a0a0a] text-[12px] text-center top-[7px]">{` Add`}</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#3e63dd] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.5px] tracking-[-0.1504px]">Primary</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-[0.5px]">#3e63dd</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[rgba(3,2,19,0.05)] h-[58px] relative rounded-[10px] shrink-0 w-[271px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[11px] pr-[51px] py-px relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#71717a] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.5px] tracking-[-0.1504px]">Neutral</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-[0.5px]">#71717a</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[10px] w-[271px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[11px] pr-[51px] py-px relative size-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[124px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container12 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[168px] relative shrink-0 w-[271px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-px tracking-[0.6px] uppercase">Base Color</p>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex h-[16px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px]">Name</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">Primary</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex h-[16px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px]">Description (Usage Note)</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] tracking-[-0.1504px]">e.g. Used for primary actions and high-priority elements.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[98px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel1 />
      <Textarea />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="content-stretch flex h-[16px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px]">Base Color (Auto-detect format)</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[36px] relative rounded-[8px] shrink-0 w-[40.484px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px]" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px]">#3e63dd</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Input2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel2 />
      <Container22 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[14px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_18_385)" id="Icon">
          <path d={svgPaths.p24da2380} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d="M7 1.16667V2.33333" id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d="M7 11.6667V12.8333" id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d={svgPaths.p37111300} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d={svgPaths.p9000440} id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d="M1.16667 7H2.33333" id="Vector_6" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d="M11.6667 7H12.8333" id="Vector_7" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d={svgPaths.p9ee27e0} id="Vector_8" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
          <path d={svgPaths.pe9da980} id="Vector_9" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_385">
            <rect fill="white" height="14" style={{ fill: "white", fillOpacity: "1" }} width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[119.547px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[22px] not-italic text-[#717182] text-[12px] top-px">Dark Mode Scale</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return <div className="bg-white rounded-[16777200px] shrink-0 size-[16px]" data-name="Primitive.span" />;
}

function PrimitiveButton() {
  return (
    <div className="bg-[#cbced4] h-[18.398px] relative rounded-[16777200px] shrink-0 w-[32px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-px relative size-full">
        <PrimitiveSpan />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[34.398px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel3 />
      <PrimitiveButton />
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[153.023px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] uppercase">{`Easing & Adjustments`}</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[117.977px] relative size-full">
          <PrimitiveLabel4 />
        </div>
      </div>
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[53.773px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px]">Hue Shift</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-px w-[14px] whitespace-pre-wrap">0°</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel5 />
      <Text2 />
    </div>
  );
}

function Text4() {
  return <div className="bg-[#030213] h-[16px] shrink-0 w-full" data-name="Text" />;
}

function Text3() {
  return (
    <div className="absolute bg-[#ececf0] content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip pr-[135.5px] rounded-[16777200px] top-0 w-[271px]" data-name="Text">
      <Text4 />
    </div>
  );
}

function Slider() {
  return <div className="absolute bg-white border border-[#030213] border-solid left-[127.5px] rounded-[16777200px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[16px] top-0" data-name="Slider" />;
}

function PrimitiveSpan1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Primitive.span">
      <Text3 />
      <Slider />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <PrimitiveSpan1 />
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[96.563px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px]">Saturation Boost</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[11.867px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-px w-[12px] whitespace-pre-wrap">1x</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel6 />
      <Text5 />
    </div>
  );
}

function Text7() {
  return <div className="bg-[#030213] h-[16px] shrink-0 w-full" data-name="Text" />;
}

function Text6() {
  return (
    <div className="absolute bg-[#ececf0] content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip pr-[135.5px] rounded-[16777200px] top-0 w-[271px]" data-name="Text">
      <Text7 />
    </div>
  );
}

function Slider1() {
  return <div className="absolute bg-white border border-[#030213] border-solid left-[127.5px] rounded-[16777200px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[16px] top-0" data-name="Slider" />;
}

function PrimitiveSpan2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Primitive.span">
      <Text6 />
      <Slider1 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <PrimitiveSpan2 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container29 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[133px] items-start pt-[17px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[509.398px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container19 />
      <Container20 />
      <Container21 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[271px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[25px] relative size-full">
        <Container18 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white h-[963px] left-0 top-0 w-[320px]" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip pl-[24px] pr-px py-[24px] relative rounded-[inherit] size-full">
        <Frame />
        <Container4 />
        <Container17 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_381)" id="Icon">
          <path d="M8.66667 14H14" id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0118 0.0078 0.0745)", strokeOpacity: "1" }} />
          <path d={svgPaths.p1ba32a00} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0118 0.0078 0.0745)", strokeOpacity: "1" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_381">
            <rect fill="white" height="16" style={{ fill: "white", fillOpacity: "1" }} width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#eceef2] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[54.5px] not-italic text-[#030213] text-[14px] text-center top-[6.5px] tracking-[-0.1504px]">{` Editor`}</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
          <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[77.57px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon5 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[51px] not-italic text-[#0a0a0a] text-[14px] text-center top-[6.5px] tracking-[-0.1504px]">{` Docs`}</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-[rgba(236,236,240,0.5)] content-stretch flex h-[42px] items-start pb-px pt-[5px] px-[5px] relative rounded-[10px] shrink-0 w-[170.773px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_370)" id="Icon">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_370">
            <rect fill="white" height="16" style={{ fill: "white", fillOpacity: "1" }} width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[124.906px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon6 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[74.5px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px]">{` Export CSS`}</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_370)" id="Icon">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_370">
            <rect fill="white" height="16" style={{ fill: "white", fillOpacity: "1" }} width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[134.727px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon7 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[79px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px]">{` Export JSON`}</p>
    </div>
  );
}

function Container36() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[36px] shrink-0 w-px" data-name="Container" />;
}

function Icon8() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3c401780} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
          <path d={svgPaths.p56b0600} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
          <path d={svgPaths.p17caa400} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[81.75px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon8 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[53px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px]">{` Save`}</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1975cc00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.0392 0.0392 0.0392)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[82.211px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon9 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[53.5px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px]">{` Load`}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Button4 />
      <Button5 />
      <Container36 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[0.5px] top-0 w-[1023.5px]">
      <Container35 />
      <Frame1 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[53px] relative shrink-0 w-[1024px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Frame2 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container34 />
    </div>
  );
}

function Container39() {
  return <div className="bg-[#3e63dd] rounded-[16777200px] shrink-0 size-[16px]" data-name="Container" />;
}

function CardTitle() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[#0a0a0a] text-[18px] top-0 tracking-[-0.4395px]">Primary</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[28px] relative shrink-0 w-[87.711px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container39 />
        <CardTitle />
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#eceef2] h-[24px] relative rounded-[8px] shrink-0 w-[52.852px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-center">Solid</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[24px] relative rounded-[8px] shrink-0 w-[57.008px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center">Alpha</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center">Contrast</p>
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#ececf0] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[10px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start pt-[4px] px-[4px] relative size-full">
        <Button8 />
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[81.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-[0.5px]">Light Scale</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[32px] relative shrink-0 w-[297.578px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container41 />
        <Text8 />
      </div>
    </div>
  );
}

function PaletteDisplay() {
  return (
    <div className="col-[1] content-stretch flex items-center justify-between justify-self-stretch relative row-[1] self-stretch shrink-0" data-name="PaletteDisplay">
      <Container38 />
      <Container40 />
    </div>
  );
}

function CardHeader() {
  return (
    <div className="bg-[rgba(236,236,240,0.1)] h-[87px] relative shrink-0 w-[1024px]" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-[6px] grid grid-cols-[repeat(1,_minmax(0,_1fr))] grid-rows-[__minmax(0,_32fr)_minmax(0,_1fr)] pb-[31px] pt-[24px] px-[24px] relative size-full">
        <PaletteDisplay />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">1</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">fdfdfe</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[#fdfdfe] content-stretch flex flex-col h-[128px] items-center justify-between left-0 pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">2</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">f5f7fc</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-[#f5f7fc] content-stretch flex flex-col h-[128px] items-center justify-between left-[85.41px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">3</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">e9edf9</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute bg-[#e9edf9] content-stretch flex flex-col h-[128px] items-center justify-between left-[170.83px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">4</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">dbe1f5</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute bg-[#dbe1f5] content-stretch flex flex-col h-[128px] items-center justify-between left-[256.24px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text15 />
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">5</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">c4d0f5</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute bg-[#c4d0f5] content-stretch flex flex-col h-[128px] items-center justify-between left-[341.66px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text17 />
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">6</p>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">adbcf0</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[#adbcf0] content-stretch flex flex-col h-[128px] items-center justify-between left-[427.07px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">7</p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">8ca2eb</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-[#8ca2eb] content-stretch flex flex-col h-[128px] items-center justify-between left-[512.48px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text21 />
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">8</p>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">5f7de3</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[#5f7de3] content-stretch flex flex-col h-[128px] items-center justify-between left-[597.9px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text23 />
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[16px] left-[38.49px] opacity-50 top-[16px] w-[7.422px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">9</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[16px] left-[19.95px] top-[96px] w-[44.508px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">3E63DD</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_18_358)" id="Icon">
          <path d={svgPaths.p225f5e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.04167" style={{ stroke: "white", strokeOpacity: "0.9" }} />
          <path d={svgPaths.p9062d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.04167" style={{ stroke: "white", strokeOpacity: "0.9" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_358">
            <rect fill="white" height="10" style={{ fill: "white", fillOpacity: "1" }} width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.2)] content-stretch flex items-center justify-center left-[60.41px] rounded-[16777200px] size-[16px] top-[8px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bg-[#3e63dd] border-[rgba(0,0,0,0.05)] border-r border-solid h-[128px] left-[683.31px] top-0 w-[85.414px]" data-name="Container">
      <Text25 />
      <Text26 />
      <Container51 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[16px] left-[34.79px] opacity-50 top-[16px] w-[14.836px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">10</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute h-[16px] left-[19.95px] top-[96px] w-[44.508px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">254dd2</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_18_378)" id="Icon">
          <path d={svgPaths.p1bca0770} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.04167" style={{ stroke: "white", strokeOpacity: "0.9" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_378">
            <rect fill="white" height="10" style={{ fill: "white", fillOpacity: "1" }} width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.2)] content-stretch flex items-center justify-center left-[60.41px] rounded-[16777200px] size-[16px] top-[8px]" data-name="Container">
      <Icon11 />
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-[#254dd2] border-[rgba(0,0,0,0.05)] border-r border-solid h-[128px] left-[768.73px] top-0 w-[85.414px]" data-name="Container">
      <Text27 />
      <Text28 />
      <Container53 />
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[14.836px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">11</p>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">1b3898</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bg-[#1b3898] content-stretch flex flex-col h-[128px] items-center justify-between left-[854.14px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text29 />
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[14.836px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">12</p>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">10172e</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-[#10172e] content-stretch flex flex-col h-[128px] items-center justify-between left-[939.55px] py-[16px] top-0 w-[84.414px]" data-name="Container">
      <Text31 />
      <Text32 />
    </div>
  );
}

function PaletteDisplay1() {
  return (
    <div className="h-[128px] relative shrink-0 w-full" data-name="PaletteDisplay">
      <Container42 />
      <Container43 />
      <Container44 />
      <Container45 />
      <Container46 />
      <Container47 />
      <Container48 />
      <Container49 />
      <Container50 />
      <Container52 />
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-0 top-px w-[170.664px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[85.77px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">App Bg</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-[170.66px] top-px w-[256px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[127.66px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Component Bg</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-[426.66px] top-px w-[256px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[127.62px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Borders</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute bg-[rgba(3,2,19,0.05)] border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-[682.66px] top-px w-[170.664px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[84.98px] not-italic text-[#030213] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Solid / Hover</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute h-[31px] left-[853.33px] top-px w-[170.672px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[85.72px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Text</p>
    </div>
  );
}

function PaletteDisplay2() {
  return (
    <div className="bg-[rgba(236,236,240,0.2)] h-[32px] relative shrink-0 w-full" data-name="PaletteDisplay">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Container56 />
      <Container57 />
      <Container58 />
      <Container59 />
      <Container60 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1024px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <PaletteDisplay1 />
        <PaletteDisplay2 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] h-[295px] items-start overflow-clip relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Card">
      <CardHeader />
      <CardContent />
    </div>
  );
}

function Container62() {
  return <div className="bg-[#71717a] rounded-[16777200px] shrink-0 size-[16px]" data-name="Container" />;
}

function CardTitle1() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[#0a0a0a] text-[18px] top-0 tracking-[-0.4395px]">Neutral</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[28px] relative shrink-0 w-[84.258px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container62 />
        <CardTitle1 />
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#eceef2] h-[24px] relative rounded-[8px] shrink-0 w-[52.852px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-center">Solid</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[24px] relative rounded-[8px] shrink-0 w-[57.008px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center">Alpha</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center">Contrast</p>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-[#ececf0] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[10px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start pt-[4px] px-[4px] relative size-full">
        <Button11 />
        <Button12 />
        <Button13 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[16px] relative shrink-0 w-[81.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-[0.5px]">Light Scale</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[32px] relative shrink-0 w-[297.578px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container64 />
        <Text33 />
      </div>
    </div>
  );
}

function PaletteDisplay3() {
  return (
    <div className="col-[1] content-stretch flex items-center justify-between justify-self-stretch relative row-[1] self-stretch shrink-0" data-name="PaletteDisplay">
      <Container61 />
      <Container63 />
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="bg-[rgba(236,236,240,0.1)] h-[87px] relative shrink-0 w-[1024px]" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-[6px] grid grid-cols-[repeat(1,_minmax(0,_1fr))] grid-rows-[__minmax(0,_32fr)_minmax(0,_1fr)] pb-[31px] pt-[24px] px-[24px] relative size-full">
        <PaletteDisplay3 />
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">1</p>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">fefefe</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute bg-[#fefefe] content-stretch flex flex-col h-[128px] items-center justify-between left-0 pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text34 />
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">2</p>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">f8f8f9</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute bg-[#f8f8f9] content-stretch flex flex-col h-[128px] items-center justify-between left-[85.41px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text36 />
      <Text37 />
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">3</p>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">f1f1f1</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute bg-[#f1f1f1] content-stretch flex flex-col h-[128px] items-center justify-between left-[170.83px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text38 />
      <Text39 />
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">4</p>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">e7e7e9</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute bg-[#e7e7e9] content-stretch flex flex-col h-[128px] items-center justify-between left-[256.24px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text40 />
      <Text41 />
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">5</p>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">dbdbde</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute bg-[#dbdbde] content-stretch flex flex-col h-[128px] items-center justify-between left-[341.66px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text42 />
      <Text43 />
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">6</p>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">cdcdd0</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute bg-[#cdcdd0] content-stretch flex flex-col h-[128px] items-center justify-between left-[427.07px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text44 />
      <Text45 />
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">7</p>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">b9b9be</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute bg-[#b9b9be] content-stretch flex flex-col h-[128px] items-center justify-between left-[512.48px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text46 />
      <Text47 />
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px]">8</p>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(0,0,0,0.7)] top-[0.5px] uppercase">9d9da4</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute bg-[#9d9da4] content-stretch flex flex-col h-[128px] items-center justify-between left-[597.9px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text48 />
      <Text49 />
    </div>
  );
}

function Text50() {
  return (
    <div className="absolute h-[16px] left-[38.49px] opacity-50 top-[16px] w-[7.422px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">9</p>
    </div>
  );
}

function Text51() {
  return (
    <div className="absolute h-[16px] left-[19.95px] top-[96px] w-[44.508px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">71717A</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_18_358)" id="Icon">
          <path d={svgPaths.p225f5e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.04167" style={{ stroke: "white", strokeOpacity: "0.9" }} />
          <path d={svgPaths.p9062d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.04167" style={{ stroke: "white", strokeOpacity: "0.9" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_358">
            <rect fill="white" height="10" style={{ fill: "white", fillOpacity: "1" }} width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.2)] content-stretch flex items-center justify-center left-[60.41px] rounded-[16777200px] size-[16px] top-[8px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute bg-[#71717a] border-[rgba(0,0,0,0.05)] border-r border-solid h-[128px] left-[683.31px] top-0 w-[85.414px]" data-name="Container">
      <Text50 />
      <Text51 />
      <Container74 />
    </div>
  );
}

function Text52() {
  return (
    <div className="absolute h-[16px] left-[34.79px] opacity-50 top-[16px] w-[14.836px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">10</p>
    </div>
  );
}

function Text53() {
  return (
    <div className="absolute h-[16px] left-[19.95px] top-[96px] w-[44.508px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">606067</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_18_378)" id="Icon">
          <path d={svgPaths.p1bca0770} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.04167" style={{ stroke: "white", strokeOpacity: "0.9" }} />
        </g>
        <defs>
          <clipPath id="clip0_18_378">
            <rect fill="white" height="10" style={{ fill: "white", fillOpacity: "1" }} width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.2)] content-stretch flex items-center justify-center left-[60.41px] rounded-[16777200px] size-[16px] top-[8px]" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute bg-[#606067] border-[rgba(0,0,0,0.05)] border-r border-solid h-[128px] left-[768.73px] top-0 w-[85.414px]" data-name="Container">
      <Text52 />
      <Text53 />
      <Container76 />
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[14.836px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">11</p>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">56565d</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute bg-[#56565d] content-stretch flex flex-col h-[128px] items-center justify-between left-[854.14px] pr-px py-[16px] top-0 w-[85.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <Text54 />
      <Text55 />
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[14.836px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px]">12</p>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-[0.5px] uppercase">1e1e1f</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute bg-[#1e1e1f] content-stretch flex flex-col h-[128px] items-center justify-between left-[939.55px] py-[16px] top-0 w-[84.414px]" data-name="Container">
      <Text56 />
      <Text57 />
    </div>
  );
}

function PaletteDisplay4() {
  return (
    <div className="h-[128px] relative shrink-0 w-full" data-name="PaletteDisplay">
      <Container65 />
      <Container66 />
      <Container67 />
      <Container68 />
      <Container69 />
      <Container70 />
      <Container71 />
      <Container72 />
      <Container73 />
      <Container75 />
      <Container77 />
      <Container78 />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-0 top-px w-[170.664px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[85.77px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">App Bg</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-[170.66px] top-px w-[256px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[127.66px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Component Bg</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-[426.66px] top-px w-[256px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[127.62px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Borders</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute bg-[rgba(3,2,19,0.05)] border-[rgba(0,0,0,0.1)] border-r border-solid h-[31px] left-[682.66px] top-px w-[170.664px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[84.98px] not-italic text-[#030213] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Solid / Hover</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute h-[31px] left-[853.33px] top-px w-[170.672px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[85.72px] not-italic text-[#717182] text-[10px] text-center top-[8.5px] tracking-[0.1172px]">Text</p>
    </div>
  );
}

function PaletteDisplay5() {
  return (
    <div className="bg-[rgba(236,236,240,0.2)] h-[32px] relative shrink-0 w-full" data-name="PaletteDisplay">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Container79 />
      <Container80 />
      <Container81 />
      <Container82 />
      <Container83 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1024px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <PaletteDisplay4 />
        <PaletteDisplay5 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] h-[295px] items-start overflow-clip relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Card">
      <CardHeader1 />
      <CardContent1 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[622px] items-start relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[791px] items-start relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container37 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[963px] items-start left-[320px] overflow-clip pt-[32px] px-[103.5px] top-0 w-[1231px]" data-name="Container">
      <Container32 />
    </div>
  );
}

export default function ColorGenerationToolv() {
  return (
    <div className="bg-white relative size-full" data-name="Color Generation Toolv2">
      <Container />
      <Container31 />
    </div>
  );
}