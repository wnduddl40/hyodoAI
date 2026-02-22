import { useState, useEffect } from "react";

/* ─── 색상 토큰 ─────────────────────────────── */
const C = {
  primary:"#FF6B35", p2:"#F7931E",
  blue:"#2979FF",    b2:"#1565C0",
  green:"#2ECC71",   g2:"#27AE60",
  yellow:"#F39C12",  y2:"#E67E22",
  red:"#E53935",     r2:"#B71C1C",
  teal:"#00BCD4",    t2:"#0097A7",
  purple:"#8E44AD",  pu2:"#6C3483",
  sky:"#0288D1",     sk2:"#01579B",
  gray:"#8D99AE",    light:"#F2F4F7",
  dark:"#1A1A2E",    cream:"#FFF8F2",
};

/* ─── 화면 ID ─────────────────────────────── */
const S = {
  HOME:"home",
  // 기차
  TR_LISTEN:"tr_listen", TR_PROC:"tr_proc", TR_CONFIRM:"tr_c", TR_CHILD:"tr_ch", TR_DONE:"tr_d",
  // 병원
  HO_LISTEN:"ho_listen", HO_PROC:"ho_proc", HO_CONFIRM:"ho_c", HO_CHILD:"ho_ch", HO_DONE:"ho_d",
  // 택시
  TX_LISTEN:"tx_listen", TX_PROC:"tx_proc", TX_CONFIRM:"tx_c", TX_DONE:"tx_d",
  // 보조기기
  AID_CONSULT:"a_co", AID_SURVEY:"a_sv", AID_CAM:"a_cam",
  AID_OCR:"a_ocr", AID_RESULT:"a_res", AID_CHILD:"a_ch", AID_DONE:"a_d",
};

/* ─── 공용 컴포넌트 ─────────────────────────── */
function Av({ size=64, emoji="😊", g=`linear-gradient(135deg,${C.primary},${C.p2})`, pulse=false }) {
  return (
    <div style={{position:"relative",display:"inline-block"}}>
      {pulse && <div style={{position:"absolute",inset:-10,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,53,0.18) 0%,transparent 70%)",animation:"pr 2s ease-in-out infinite"}}/>}
      <div style={{width:size,height:size,borderRadius:"50%",background:g,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.46,boxShadow:"0 4px 20px rgba(0,0,0,0.2)",position:"relative",zIndex:1,flexShrink:0}}>{emoji}</div>
    </div>
  );
}

function Shell({ children, bg=C.cream }) {
  return (
    <div style={{width:380,minHeight:790,background:bg,borderRadius:46,boxShadow:"0 36px 90px rgba(0,0,0,0.22),0 0 0 9px #222,0 0 0 11px #444",overflow:"hidden",display:"flex",flexDirection:"column",fontFamily:"'Noto Sans KR',sans-serif"}}>
      <div style={{background:C.dark,color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 26px 9px",fontSize:13,fontWeight:600,flexShrink:0}}>
        <span>9:41</span><span>●●● WiFi 🔋</span>
      </div>
      {children}
    </div>
  );
}

function Bar({ onBack, grad=`linear-gradient(135deg,${C.primary},${C.p2})` }) {
  return (
    <div style={{background:grad,padding:"12px 18px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
      <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:34,height:34,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>‹</button>
      <div style={{flex:1,textAlign:"center"}}>
        <Av size={48}/>
        <div style={{color:"white",fontWeight:800,fontSize:13,marginTop:3}}>효도 AI · 지혜</div>
      </div>
      <div style={{width:34}}/>
    </div>
  );
}

function Bubble({ children, style={} }) {
  return <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:"17px 19px",boxShadow:"0 4px 18px rgba(0,0,0,0.07)",border:"2px solid #FFE0CC",fontSize:17,fontWeight:700,color:C.dark,lineHeight:1.65,...style}}>{children}</div>;
}

function Btn({ children, onClick, c=C.blue, c2=C.b2, style={} }) {
  return <button onClick={onClick} style={{background:`linear-gradient(135deg,${c},${c2})`,border:"none",borderRadius:16,padding:"17px",color:"white",fontSize:18,fontWeight:900,cursor:"pointer",width:"100%",boxShadow:`0 5px 20px ${c}55`,...style}}>{children}</button>;
}
function GBtn({ children, onClick }) {
  return <button onClick={onClick} style={{background:C.light,border:"2px solid #DDD",borderRadius:16,padding:"14px",color:C.gray,fontSize:16,fontWeight:700,cursor:"pointer",width:"100%"}}>{children}</button>;
}

/* ─── 음성인식 공용 ─────────────────────────── */
function ListenScreen({ phrase, onDone, grad }) {
  const [txt, setTxt] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i += 2; setTxt(phrase.slice(0, i));
      if (i >= phrase.length) { clearInterval(iv); setDone(true); setTimeout(onDone, 850); }
    }, 65);
    return () => clearInterval(iv);
  }, []);
  return (
    <Shell bg={C.dark}>
      <div style={{background:"linear-gradient(160deg,#0f0f1a,#1a1a2e)",flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"38px 26px"}}>
        <Av size={78} pulse/>
        <div style={{color:C.primary,fontWeight:800,fontSize:21,marginTop:26,marginBottom:18}}>{done?"✓ 인식 완료!":"듣고 있어요..."}</div>
        {!done && (
          <div style={{display:"flex",gap:5,alignItems:"center",height:50,marginBottom:22}}>
            {[1,2,3,4,5,6,7,8,9,10].map(n=>(
              <div key={n} style={{width:5,background:`linear-gradient(to top,${C.primary},${C.p2})`,borderRadius:4,animation:`wv ${0.35+n*0.06}s ease-in-out infinite alternate`,animationDelay:`${n*0.04}s`}}/>
            ))}
          </div>
        )}
        {done && <div style={{fontSize:42,marginBottom:18}}>✅</div>}
        {txt && (
          <div style={{background:"rgba(255,255,255,0.07)",border:"2px solid rgba(255,107,53,0.33)",borderRadius:18,padding:"18px 22px",color:"white",fontSize:19,fontWeight:700,lineHeight:1.55,textAlign:"center"}}>
            "{txt}{!done && <span style={{borderRight:`2px solid ${C.primary}`,animation:"cb 0.7s step-end infinite"}}> </span>}"
          </div>
        )}
      </div>
      <style>{`@keyframes wv{from{height:6px}to{height:42px}} @keyframes cb{0%,100%{opacity:1}50%{opacity:0}} @keyframes pr{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.18);opacity:0.3}}`}</style>
    </Shell>
  );
}

/* ─── 처리중 공용 ─────────────────────────── */
function ProcScreen({ steps, icons, onDone, onBack }) {
  const [vis, setVis] = useState(1);
  useEffect(() => {
    const tids = [];
    steps.slice(1).forEach((_,i)=> tids.push(setTimeout(()=>setVis(i+2),(i+1)*750)));
    const doneTid = setTimeout(onDone, steps.length * 750 + 400);
    tids.push(doneTid);
    return () => tids.forEach(clearTimeout);
  }, []);
  return (
    <Shell bg="#0f2027">
      <div style={{background:"linear-gradient(160deg,#0f2027,#1a1a3e)",flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"36px 24px"}}>
        <Av size={70} pulse/>
        <div style={{color:"white",fontWeight:800,fontSize:20,marginTop:22,marginBottom:5}}>잠시만 기다려 주세요</div>
        <div style={{color:"rgba(255,255,255,0.48)",fontSize:13,marginBottom:30}}>최고의 방법을 찾아드릴게요.</div>
        <div style={{position:"relative",width:86,height:86,marginBottom:30}}>
          <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"3px solid rgba(255,107,53,0.14)"}}/>
          <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"3px solid transparent",borderTopColor:C.primary,animation:"sp 1s linear infinite"}}/>
          <div style={{position:"absolute",inset:11,borderRadius:"50%",border:"2px solid transparent",borderTopColor:C.p2,animation:"sp 0.65s linear infinite reverse"}}/>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:20,height:20,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.p2})`}}/>
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8}}>
          {steps.map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,background:i<vis?"rgba(255,107,53,0.11)":"rgba(255,255,255,0.03)",border:`1.5px solid ${i<vis?"rgba(255,107,53,0.28)":"rgba(255,255,255,0.05)"}`,borderRadius:13,padding:"11px 15px",transition:"all 0.4s",opacity:i<vis?1:0.28}}>
              <span style={{fontSize:18}}>{i<vis?(i<steps.length-1?"✅":"⏳"):icons[i]}</span>
              <span style={{color:i<vis?"white":"rgba(255,255,255,0.32)",fontSize:14,fontWeight:600}}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#0f2027",padding:"13px 24px 24px",display:"flex",justifyContent:"center"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"10px 36px",color:"rgba(255,255,255,0.48)",fontSize:14,fontWeight:600,cursor:"pointer"}}>취소하기</button>
      </div>
      <style>{`@keyframes sp{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </Shell>
  );
}

/* ─── 자녀승인 공용 ─────────────────────────── */
function ChildScreen({ push, rows, onApprove, onReject }) {
  return (
    <Shell>
      <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",padding:"13px 16px",display:"flex",alignItems:"flex-start",gap:11,flexShrink:0}}>
        <div style={{width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${C.primary},${C.p2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🤍</div>
        <div><div style={{color:"rgba(255,255,255,0.45)",fontSize:11}}>효도 AI • 방금 전</div><div style={{color:"white",fontSize:13,fontWeight:600,lineHeight:1.5}}>{push}</div></div>
      </div>
      <div style={{flex:1,padding:"18px 16px",display:"flex",flexDirection:"column",gap:13,overflow:"auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.p2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>👩</div>
          <div><div style={{fontSize:16,fontWeight:900,color:C.dark}}>부모님 요청 승인</div><div style={{fontSize:12,color:C.gray}}>2026년 2월 28일</div></div>
          <div style={{marginLeft:"auto",background:"#FFF3E0",color:C.primary,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700}}>대기중</div>
        </div>
        <div style={{background:"white",borderRadius:18,padding:"16px",boxShadow:"0 4px 14px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:11,color:C.gray,fontWeight:600,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.4px"}}>요청 내용</div>
          {rows.map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F5F5F5"}}>
              <span style={{fontSize:13,color:C.gray}}>{l}</span>
              <span style={{fontSize:13,fontWeight:700,color:C.dark}}>{v}</span>
            </div>
          ))}
        </div>
        <Btn onClick={onApprove} c={C.green} c2={C.g2}>✅ 승인하고 결제하기</Btn>
        <Btn onClick={onReject} c={C.red} c2={C.r2} style={{fontSize:15,padding:"15px"}}>❌ 거절 및 부모님께 전화하기</Btn>
      </div>
    </Shell>
  );
}

/* ─── 완료 공용 ─────────────────────────── */
function DoneScreen({ title, sub, cardTitle, cardSub, cardBadge, badgeColor, onReset }) {
  const [show, setShow] = useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),100);},[]);
  return (
    <Shell>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 22px",background:`radial-gradient(ellipse at 50% 28%,rgba(46,204,113,0.1) 0%,transparent 60%),${C.cream}`}}>
        <div style={{width:130,height:130,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},${C.g2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:62,boxShadow:"0 0 0 16px rgba(46,204,113,0.1),0 0 0 32px rgba(46,204,113,0.05),0 14px 36px rgba(46,204,113,0.36)",transform:show?"scale(1)":"scale(0.35)",transition:"transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",marginBottom:24}}>✅</div>
        <div style={{fontSize:26,fontWeight:900,color:C.dark,textAlign:"center",marginBottom:8,opacity:show?1:0,transition:"opacity 0.4s 0.2s"}}>{title}</div>
        <div style={{fontSize:14,color:C.gray,textAlign:"center",lineHeight:1.7,marginBottom:24,opacity:show?1:0,transition:"opacity 0.4s 0.35s"}}>{sub}</div>
        <div style={{width:"100%",background:"white",borderRadius:18,padding:"15px 19px",boxShadow:"0 4px 16px rgba(0,0,0,0.06)",marginBottom:14,opacity:show?1:0,transition:"opacity 0.4s 0.45s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:16,fontWeight:900,color:C.dark}}>{cardTitle}</span>
            <span style={{background:badgeColor||"#E8F5E9",color:C.g2,borderRadius:8,padding:"3px 9px",fontSize:12,fontWeight:700}}>{cardBadge}</span>
          </div>
          <div style={{fontSize:13,color:C.gray,lineHeight:1.6}}>{cardSub}</div>
        </div>
        <div style={{width:"100%",background:"white",borderRadius:18,padding:"15px 19px",boxShadow:"0 4px 14px rgba(0,0,0,0.05)",opacity:show?1:0,transition:"opacity 0.4s 0.55s"}}>
          <div style={{fontSize:15,fontWeight:800,color:C.dark,marginBottom:12}}>혹시 다른 것도 도와드릴까요?</div>
          <div style={{display:"flex",gap:9}}>
            <button onClick={onReset} style={{flex:1,background:`linear-gradient(135deg,${C.primary},${C.p2})`,border:"none",borderRadius:13,padding:"13px",color:"white",fontSize:16,fontWeight:800,cursor:"pointer"}}>네 👍</button>
            <button onClick={onReset} style={{flex:1,background:C.light,border:"none",borderRadius:13,padding:"13px",color:C.gray,fontSize:16,fontWeight:700,cursor:"pointer"}}>아니오</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════
   🚂 기차 플로우
══════════════════════════════════════════════ */
function TrainConfirm({ onApprove, onRetry, onBack }) {
  const [stage, setStage] = useState('idle'); // idle, analyzing, fetching, ready
  const [status, setStatus] = useState("");
  const [trainData, setTrainData] = useState(null);

  // 시뮬레이션용 API 데이터
  const mockApiResult = {
    trainNo: "KTX-산천 121",
    departure: "서울 (11:30)",
    arrival: "부산 (14:15)",
    seat: "일반실 8호차 12C (창가)",
    price: "59,800원"
  };

  const startSimulation = async () => {
    // 1단계: LLM 의도 분석 시뮬레이션
    setStage('analyzing');
    setStatus("AI가 요청 내용을 분석하고 있습니다...");
    await new Promise(res => setTimeout(res, 1500));

    // 2단계: 공공데이터 API 호출 시뮬레이션
    setStage('fetching');
    setStatus("국토교통부 열차정보 API 연결 중...");
    await new Promise(res => setTimeout(res, 1500));

    // 3단계: 데이터 수신 완료
    setTrainData(mockApiResult);
    setStage('ready');
  };

  // 컴포넌트가 뜨자마자 시뮬레이션 시작
  useEffect(() => {
    startSimulation();
  }, []);

  return (
    <Shell>
      <Bar onBack={onBack} grad={`linear-gradient(135deg,#1565C0,#0D47A1)`}/>

      <div style={{flex:1, padding:"20px 16px", display:"flex", flexDirection:"column", position: "relative", background: "#f8f9fa"}}>

        {/* API 통신 로딩 레이어 */}
        {(stage === 'analyzing' || stage === 'fetching') && (
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flex:1, gap:20}}>
            <div className="spinner" style={{width:50, height:50, border:"5px solid #E3F2FD", borderTopColor:C.blue, borderRadius:"50%", animation:"sp 1s linear infinite"}} />
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:18, fontWeight:800, color:C.blue, marginBottom:8}}>{status}</div>
              <div style={{fontSize:13, color:C.gray}}>전국 열차 데이터를 실시간으로 조회하고 있습니다.</div>
            </div>
            {/* 시스템 로그처럼 보이는 디자인 (트랙2 강조용) */}
            <div style={{background:C.dark, color:"#4AF626", padding:"12px", borderRadius:10, fontSize:10, width:"90%", fontFamily:"monospace", opacity:0.8}}>
              {stage === 'analyzing' ? "> Extracting Entities... [OK]\n> Destination: BUSAN\n> Time: 11:30" : "> Fetching OpenData API...\n> GET /getRestTrainList/v1.0 HTTP/1.1\n> Connection: Established"}
            </div>
          </div>
        )}

        {/* 결과 화면 (API 통신 완료 후) */}
        {stage === 'ready' && trainData && (
          <div style={{display:"flex", flexDirection:"column", gap:14, animation: "fadeIn 0.5s"}}>
            <Bubble>
              어머님, 말씀하신 대로<br/>
              <span style={{color:C.blue}}>{trainData.departure} 부산행</span><br/>좌석을 찾았습니다! 예매할까요?
            </Bubble>

            <div style={{background:"white", borderRadius:22, padding:"20px", boxShadow:"0 10px 25px rgba(0,0,0,0.08)", border:"1.5px solid #E3F2FD"}}>
              <div style={{fontSize:12, fontWeight:800, color:C.blue, marginBottom:10, display:"flex", alignItems:"center", gap:5}}>
                <span style={{width:8, height:8, borderRadius:"50%", background:C.blue}}/> 실시간 API 데이터 연동됨
              </div>
              {[
                ["🚂 열차종류", trainData.trainNo],
                ["🕑 출발시간", trainData.departure],
                ["🏁 도착예정", trainData.arrival],
                ["💺 좌석정보", trainData.seat],
                ["💰 티켓요금", trainData.price]
              ].map(([l, v]) => (
                <div key={l} style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #F0F2F5"}}>
                  <span style={{color:C.gray, fontSize:14}}>{l}</span>
                  <span style={{fontWeight:800, fontSize:14, color:C.dark}}>{v}</span>
                </div>
              ))}
            </div>

            <Btn onClick={onApprove} c={C.blue} c2={C.b2}>네, 이 표로 예매해줘 ✓</Btn>
            <GBtn onClick={onRetry}>다른 시간표 다시보기</GBtn>
          </div>
        )}
      </div>
      <style>{`
        @keyframes sp{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0; transform:translateY(10px)}to{opacity:1; transform:translateY(0)}}
      `}</style>
    </Shell>
  );
}

/* ══════════════════════════════════════════════
   🏥 병원예약 플로우
══════════════════════════════════════════════ */
function HospReservation({ onApprove, onBack }) {
  const [stage, setStage] = useState('idle'); // idle -> analyzing -> selecting -> confirmed
  const [analysis, setAnalysis] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const startAnalysis = async () => {
    setStage('analyzing');
    await new Promise(res => setTimeout(res, 2000));
    setAnalysis({
      hospital: "서울중앙정형외과",
      type: "정형외과",
      date: "2026-02-23(월)",
      location: "종로구"
    });
    setStage('selecting');
  };

  useEffect(() => {
    startAnalysis();
  }, []);

  const timeSlots = ["09:30", "10:00", "11:30", "14:00", "15:30", "16:30"];

  return (
    <Shell>
      <Bar onBack={onBack} grad={`linear-gradient(135deg,${C.purple},${C.pu2})`}/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", background:"#F8F9FA" }}>
        {stage === 'analyzing' && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20 }}>
            <div className="pulse-mic" style={{ fontSize:60, marginBottom:20 }}>🎙️</div>
            <b style={{ fontSize:20, color:"#673AB7" }}>어머님 말씀을 분석하고 있어요</b>
            <p style={{ color:"#666", textAlign:"center" }}>"내일 오전 서울중앙정형외과 예약해줘"</p>
            <div style={{ width:'100%', background:'#222', color:'#0F0', padding:15, borderRadius:10, fontSize:11, marginTop:30, fontFamily:'monospace' }}>
              {"> Processing STT..."}<br/>
              {"> NLP Entity Extraction: [Hospital: Seoul Central] [Dept: Orthopedics]"}<br/>
              {"> Calling HIRA_Hosp_Info_API..."}
            </div>
          </div>
        )}

        {stage === 'selecting' && (
          <div style={{ padding:20, animation:"fadeIn 0.5s" }}>
            <div style={{ background:"white", padding:20, borderRadius:20, border:"2px solid #673AB7", marginBottom:20 }}>
              <span style={{ background:"#673AB7", color:"white", padding:"4px 8px", borderRadius:8, fontSize:12 }}>확인된 정보</span>
              <h2 style={{ margin:"10px 0 5px 0" }}>{analysis.hospital}</h2>
              <p style={{ margin:0, color:"#666" }}>📅 {analysis.date}</p>
            </div>

            <p style={{ fontWeight:800, fontSize:18, marginBottom:15 }}>몇 시에 방문하시겠어요?</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => { setSelectedTime(time); setStage('confirmed'); }}
                  style={{
                    padding:"15px 10px", borderRadius:12, border:"1px solid #DDD",
                    background:"white", fontSize:15, fontWeight:700, cursor:"pointer"
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === 'confirmed' && (
          <div style={{ padding:20, animation:"fadeIn 0.5s" }}>
            <div style={{ textAlign:"center", padding:"40px 0" }}>
              <div style={{ fontSize:50 }}>✅</div>
              <h2 style={{ marginBottom:5 }}>예약 준비 완료!</h2>
              <p style={{ color:"#666" }}>선택하신 시간이 맞는지 확인해 주세요.</p>
            </div>

            <div style={{ background:"white", padding:25, borderRadius:24, boxShadow:"0 10px 20px rgba(0,0,0,0.05)", marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ color:"#888" }}>병원명</span>
                <b>{analysis.hospital}</b>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ color:"#888" }}>예약일시</span>
                <b style={{ color:"#673AB7" }}>{analysis.date} {selectedTime}</b>
              </div>
            </div>

            <button
              onClick={() => onApprove(analysis, selectedTime)}
              style={{ width:"100%", padding:"20px", borderRadius:18, border:"none", background:"#673AB7", color:"white", fontSize:18, fontWeight:800, cursor:"pointer" }}
            >
              자녀에게 승인 요청하기
            </button>
          </div>
        )}

        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .pulse-mic { animation: pulse 1.5s infinite; }
          @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
        `}</style>
      </div>
    </Shell>
  );
}

function HospDone({ onReset }) {
  const [show, setShow] = useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),100);},[]);
  return (
    <Shell>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 22px",background:`radial-gradient(ellipse at 50% 28%,rgba(142,68,173,0.1) 0%,transparent 60%),${C.cream}`}}>
        <div style={{width:130,height:130,borderRadius:"50%",background:`linear-gradient(135deg,${C.purple},${C.pu2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:62,boxShadow:"0 0 0 16px rgba(142,68,173,0.1),0 0 0 32px rgba(142,68,173,0.05),0 14px 36px rgba(142,68,173,0.36)",transform:show?"scale(1)":"scale(0.35)",transition:"transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",marginBottom:24}}>✅</div>
        <div style={{fontSize:26,fontWeight:900,color:C.dark,textAlign:"center",marginBottom:8,opacity:show?1:0,transition:"opacity 0.4s 0.2s"}}>예약이 완료되었습니다!</div>
        <div style={{fontSize:14,color:C.gray,textAlign:"center",lineHeight:1.7,marginBottom:24,opacity:show?1:0,transition:"opacity 0.4s 0.35s"}}>따님께도 알림을 보냈어요.<br/>예약 내역은 <strong>문자</strong>로 보내드렸어요. 📱</div>
        <div style={{width:"100%",background:"white",borderRadius:18,padding:"15px 19px",boxShadow:"0 4px 16px rgba(0,0,0,0.06)",marginBottom:14,opacity:show?1:0,transition:"opacity 0.4s 0.45s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:16,fontWeight:900,color:C.dark}}>🏥 정형외과 예약</span>
            <span style={{background:"#F3E5F5",color:C.purple,borderRadius:8,padding:"3px 9px",fontSize:12,fontWeight:700}}>예약완료</span>
          </div>
          <div style={{fontSize:13,color:C.gray,lineHeight:1.6}}>서울 정형외과의원 · 내일 오전 10:30<br/>예약번호: HYD-HO-2026-0314</div>
        </div>
        <div style={{width:"100%",background:"#F3E5F5",border:"1.5px solid #CE93D8",borderRadius:16,padding:"14px 18px",marginBottom:20,opacity:show?1:0,transition:"opacity 0.4s 0.5s"}}>
          <div style={{fontSize:14,fontWeight:800,color:"#6A1B9A",marginBottom:5}}>💡 내일 병원 가시기 전에</div>
          <div style={{fontSize:13,color:"#7B1FA2",lineHeight:1.6}}>건강보험증 챙기시고, 진료 전날 밤 금식 필요 없습니다. 편하게 오세요!</div>
        </div>
        <div style={{width:"100%",display:"flex",gap:9,opacity:show?1:0,transition:"opacity 0.4s 0.55s"}}>
          <button onClick={onReset} style={{flex:1,background:`linear-gradient(135deg,${C.primary},${C.p2})`,border:"none",borderRadius:13,padding:"13px",color:"white",fontSize:16,fontWeight:800,cursor:"pointer"}}>네 👍</button>
          <button onClick={onReset} style={{flex:1,background:C.light,border:"none",borderRadius:13,padding:"13px",color:C.gray,fontSize:16,fontWeight:700,cursor:"pointer"}}>아니오</button>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════
   🚕 택시 플로우
══════════════════════════════════════════════ */
function TaxiConfirm({ onApprove, onBack }) {
  const [eta, setEta] = useState(3);
  useEffect(()=>{
    const iv = setInterval(()=>setEta(e=>e>1?e-1:e),3000);
    return()=>clearInterval(iv);
  },[]);
  return (
    <Shell>
      <Bar onBack={onBack} grad={`linear-gradient(135deg,${C.yellow},${C.y2})`}/>
      <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",gap:14,overflow:"auto"}}>
        <Bubble style={{borderColor:"#FFE082"}}>
          어머님, 주변 택시를 찾았어요!<br/>
          <span style={{color:C.yellow}}>약 {eta}분 후 도착</span>합니다.<br/>바로 부르실까요?
        </Bubble>

        {/* 지도 미리보기 (시뮬레이션) */}
        <div style={{background:"linear-gradient(135deg,#E8F5E9,#E3F2FD)",borderRadius:18,height:140,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",border:"2px solid #E0E0E0"}}>
          <div style={{position:"absolute",inset:0,opacity:0.15,backgroundImage:"repeating-linear-gradient(0deg,#999 0px,#999 1px,transparent 1px,transparent 24px),repeating-linear-gradient(90deg,#999 0px,#999 1px,transparent 1px,transparent 24px)"}}/>
          <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",fontSize:28}}>📍</div>
          <div style={{position:"absolute",bottom:60,left:"38%",fontSize:22,animation:"carMove 2s ease-in-out infinite alternate"}}>🚕</div>
          <div style={{position:"absolute",top:12,right:12,background:"rgba(255,255,255,0.9)",borderRadius:10,padding:"5px 10px",fontSize:12,fontWeight:700,color:C.dark}}>현재 위치 확인중...</div>
        </div>

        <div style={{background:"white",borderRadius:18,padding:"15px 17px",boxShadow:"0 4px 14px rgba(0,0,0,0.05)"}}>
          {[["🚕 차종","카카오택시 일반"],["⏱ 예상 도착",`${eta}분 후`],["📍 출발","현재 위치"],["🏁 도착","말씀하신 목적지"],["💰 예상요금","8,500원"]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #F5F5F5"}}>
              <span style={{color:C.gray,fontSize:14}}>{l}</span>
              <span style={{fontWeight:800,fontSize:14,color:l.includes("💰")?C.yellow:C.dark}}>{v}</span>
            </div>
          ))}
        </div>
        <Btn onClick={onApprove} c={C.yellow} c2={C.y2} style={{color:C.dark}}>🚕 네, 불러줘!</Btn>
        <GBtn onClick={onBack}>아니, 취소할게</GBtn>
        <div style={{background:"#FFFDE7",border:"1.5px solid #FFC107",borderRadius:13,padding:"12px 14px",fontSize:13,color:"#7B6914",lineHeight:1.6}}>
          💳 결제는 등록된 카드로 자동 결제됩니다.<br/>기사님 번호가 문자로 전송돼요.
        </div>
      </div>
      <style>{`@keyframes carMove{from{left:35%}to{left:45%}}`}</style>
    </Shell>
  );
}

function TaxiDone({ onReset }) {
  const [show, setShow] = useState(false);
  const [eta, setEta] = useState(3);
  useEffect(()=>{setTimeout(()=>setShow(true),100);},[]);
  useEffect(()=>{
    const iv = setInterval(()=>setEta(e=>e>0?e-1:e),4000);
    return()=>clearInterval(iv);
  },[]);
  return (
    <Shell>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 22px",background:`radial-gradient(ellipse at 50% 28%,rgba(243,156,18,0.1) 0%,transparent 60%),${C.cream}`}}>
        <div style={{width:130,height:130,borderRadius:"50%",background:`linear-gradient(135deg,${C.yellow},${C.y2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:62,boxShadow:"0 0 0 16px rgba(243,156,18,0.12),0 0 0 32px rgba(243,156,18,0.06),0 14px 36px rgba(243,156,18,0.38)",transform:show?"scale(1)":"scale(0.35)",transition:"transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",marginBottom:24}}>🚕</div>
        <div style={{fontSize:26,fontWeight:900,color:C.dark,textAlign:"center",marginBottom:8,opacity:show?1:0,transition:"opacity 0.4s 0.2s"}}>택시가 오고 있어요!</div>
        <div style={{fontSize:14,color:C.gray,textAlign:"center",lineHeight:1.7,marginBottom:24,opacity:show?1:0,transition:"opacity 0.4s 0.35s"}}>기사님 번호를 <strong>문자</strong>로 보내드렸어요. 📱<br/>따님께도 알림이 전송되었습니다.</div>
        {/* Live ETA card */}
        <div style={{width:"100%",background:`linear-gradient(135deg,${C.yellow},${C.y2})`,borderRadius:20,padding:"20px 22px",marginBottom:14,opacity:show?1:0,transition:"opacity 0.4s 0.4s",boxShadow:"0 8px 24px rgba(243,156,18,0.35)"}}>
          <div style={{fontSize:13,color:"rgba(0,0,0,0.5)",fontWeight:700,marginBottom:4}}>예상 도착까지</div>
          <div style={{display:"flex",alignItems:"baseline",gap:8}}>
            <span style={{fontSize:52,fontWeight:900,color:C.dark,lineHeight:1}}>{eta}</span>
            <span style={{fontSize:22,fontWeight:800,color:C.dark}}>분</span>
          </div>
          <div style={{fontSize:13,color:"rgba(0,0,0,0.5)",marginTop:8}}>🚕 차량번호: 서울 12가 3456 · 기사 김철수</div>
        </div>
        <div style={{width:"100%",background:"white",borderRadius:18,padding:"15px 19px",boxShadow:"0 4px 14px rgba(0,0,0,0.05)",marginBottom:14,opacity:show?1:0,transition:"opacity 0.4s 0.5s"}}>
          <div style={{fontSize:13,color:C.gray,marginBottom:4}}>💰 예상 요금</div>
          <div style={{fontSize:22,fontWeight:900,color:C.dark}}>8,500원</div>
          <div style={{fontSize:12,color:C.gray,marginTop:3}}>도착 후 등록 카드로 자동 결제됩니다</div>
        </div>
        <div style={{width:"100%",display:"flex",gap:9,opacity:show?1:0,transition:"opacity 0.4s 0.6s"}}>
          <button onClick={onReset} style={{flex:1,background:`linear-gradient(135deg,${C.primary},${C.p2})`,border:"none",borderRadius:13,padding:"13px",color:"white",fontSize:16,fontWeight:800,cursor:"pointer"}}>확인 👍</button>
          <button onClick={()=>alert("기사님께 전화 연결합니다 📞")} style={{flex:1,background:C.light,border:"none",borderRadius:13,padding:"13px",color:C.dark,fontSize:16,fontWeight:700,cursor:"pointer"}}>📞 기사에게 전화</button>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════
   🦯 보조기기 플로우
══════════════════════════════════════════════ */
function AidConsult({ onYes, onNo, onBack }) {
  return (
    <Shell>
      <Bar onBack={onBack} grad={`linear-gradient(135deg,${C.teal},${C.t2})`}/>
      <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",gap:14,overflow:"auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:9,background:"rgba(0,188,212,0.07)",border:"1.5px solid rgba(0,188,212,0.18)",borderRadius:12,padding:"9px 13px"}}>
          <span style={{fontSize:20}}>🦯</span>
          <span style={{fontSize:13,fontWeight:700,color:C.t2}}>보조기기 국가 지원 안내</span>
        </div>
        <Bubble style={{borderColor:"#B2EBF2",fontSize:17,lineHeight:1.7}}>
          어머님, 걷기 힘드실 때 쓰는<br/>
          <span style={{color:C.t2,fontWeight:900}}>실버카/지팡이/휠체어 등</span>을<br/>
          국가보조금을 지원받아서<br/>
          <span style={{color:C.primary,fontWeight:900}}>저렴하게</span> 준비해 드릴 수 있어요. 😊<br/><br/>
          자격이 되는지 확인해볼까요?
        </Bubble>
        <Btn onClick={onYes} c={C.blue} c2={C.b2} style={{fontSize:20}}>응, 확인해줘 👍</Btn>
        <GBtn onClick={onNo}>아니, 괜찮아</GBtn>
        <div style={{background:"linear-gradient(135deg,#E3F2FD,#E8F5E9)",borderRadius:15,padding:"15px 16px",border:"1.5px solid rgba(0,188,212,0.13)"}}>
          <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:8}}>💡 지원 안내</div>
          {[["🏆","노인장기요양등급이 있으면","85~100% 지원"],["📋","처방전 사진 한 장이면","신청서 자동 완성"],["🚚","신청 완료 후","집으로 배송"]].map(([ic,l,v])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:16}}>{ic}</span>
              <div><span style={{fontSize:12,color:C.gray}}>{l} </span><span style={{fontSize:12,fontWeight:800,color:C.t2}}>{v}</span></div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function AidSurvey({ onDone, onBack }) {
  const [ans, setAns] = useState({});
  const qs = [
    {id:"q1",q:"노인장기요양등급을 받으셨나요?",opts:["네, 있어요","아니요","잘 모르겠어요"]},
    {id:"q2",q:"어떤 기기가 필요하세요?",opts:["실버카 (보행보조기)","휠체어","지팡이","기타"]},
    {id:"q3",q:"처방전을 받으셨나요?",opts:["네, 있어요","아직 없어요"]},
  ];
  const allDone = qs.every(q=>ans[q.id]);
  return (
    <Shell>
      <Bar onBack={onBack} grad={`linear-gradient(135deg,${C.teal},${C.t2})`}/>
      <div style={{flex:1,padding:"18px 16px",overflow:"auto"}}>
        <div style={{fontSize:18,fontWeight:900,color:C.dark,marginBottom:4}}>간단히 여쭤볼게요 💬</div>
        <div style={{fontSize:12,color:C.gray,marginBottom:18}}>버튼을 누르거나 말씀하셔도 돼요</div>
        {qs.map((item,qi)=>(
          <div key={item.id} style={{marginBottom:18}}>
            <div style={{fontSize:15,fontWeight:800,color:C.dark,marginBottom:8}}>
              <span style={{color:C.teal,marginRight:6}}>Q{qi+1}.</span>{item.q}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {item.opts.map(opt=>(
                <button key={opt} onClick={()=>setAns(a=>({...a,[item.id]:opt}))} style={{background:ans[item.id]===opt?`linear-gradient(135deg,${C.teal},${C.t2})`:"white",border:`2px solid ${ans[item.id]===opt?C.teal:"#E0E0E0"}`,borderRadius:12,padding:"12px 15px",color:ans[item.id]===opt?"white":C.dark,fontSize:14,fontWeight:700,cursor:"pointer",textAlign:"left",transition:"all 0.18s"}}>
                  {ans[item.id]===opt?"✓ ":""}{opt}
                </button>
              ))}
            </div>
          </div>
        ))}
        {allDone && <Btn onClick={onDone} c={C.teal} c2={C.t2}>다음 단계로 →</Btn>}
      </div>
    </Shell>
  );
}

function AidCamera({ onCapture, onBack }) {
  const [shot, setShot] = useState(false);
  const [flash, setFlash] = useState(false);
  const handle = () => {
    setFlash(true);
    setTimeout(()=>{ setFlash(false); setShot(true); setTimeout(onCapture,900); },400);
  };
  return (
    <Shell bg="#111">
      <div style={{background:"#111",padding:"12px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:"50%",width:34,height:34,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <span style={{color:"white",fontWeight:800,fontSize:14}}>처방전 촬영</span>
      </div>
      <div style={{flex:1,background:"#1a1a1a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"16px"}}>
        <div style={{width:"100%",maxWidth:290,aspectRatio:"3/4",background:"linear-gradient(135deg,#2a2a2a,#1a1a1a)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:16,border:`3px dashed ${shot?C.green:C.teal}`,borderRadius:8,transition:"border-color 0.4s"}}>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
              {shot?<><span style={{fontSize:48}}>✅</span><span style={{color:C.green,fontWeight:800,fontSize:14}}>촬영 완료!</span></>:<><span style={{fontSize:36,opacity:0.38}}>📄</span><span style={{color:"rgba(255,255,255,0.35)",fontSize:12,textAlign:"center"}}>처방전을 여기에<br/>맞춰주세요</span></>}
            </div>
          </div>
          {flash && <div style={{position:"absolute",inset:0,background:"rgba(255,255,255,0.88)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>📸</div>}
        </div>
        <div style={{color:"rgba(255,255,255,0.65)",fontSize:13,textAlign:"center",marginTop:16,lineHeight:1.65}}>
          병원에서 받은 <strong style={{color:"white"}}>'처방전'</strong>을<br/>사각형 안에 맞게 찍어주세요.
        </div>
      </div>
      <div style={{background:"#111",padding:"16px 24px 28px",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        <div onClick={handle} style={{width:72,height:72,borderRadius:"50%",background:shot?C.green:"white",border:`5px solid ${shot?C.g2:"#555"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,cursor:"pointer",transition:"all 0.3s",boxShadow:"0 4px 16px rgba(0,0,0,0.36)"}}>
          {shot?"✓":"📷"}
        </div>
        <div style={{color:"rgba(255,255,255,0.38)",fontSize:11,textAlign:"center"}}>글씨가 선명하면 AI가 신청서를 써드려요.</div>
      </div>
    </Shell>
  );
}

function AidOcr({ onDone }) {
  const steps = ["사진 선명도 확인 중","처방전 내용 읽는 중 (OCR)","지원 자격 자동 확인","신청서 자동 작성 중"];
  const icons = ["🔍","📖","✅","📝"];
  const [vis, setVis] = useState(1);
  useEffect(()=>{
    steps.slice(1).forEach((_,i)=>setTimeout(()=>setVis(i+2),(i+1)*900));
    setTimeout(onDone, 3800);
  },[]);
  return (
    <Shell bg="#0a1628">
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"36px 24px",background:"linear-gradient(160deg,#0a1628,#0f2744)"}}>
        <div style={{fontSize:20,color:"white",fontWeight:800,marginBottom:6}}>처방전을 읽고 있어요</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.42)",marginBottom:30}}>잠깐이면 돼요! ✨</div>
        <div style={{width:160,height:214,borderRadius:12,background:"rgba(255,255,255,0.04)",border:"2px solid rgba(0,188,212,0.26)",position:"relative",marginBottom:30,overflow:"hidden"}}>
          <div style={{position:"absolute",left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${C.teal},transparent)`,animation:"scan 2s ease-in-out infinite"}}/>
          <div style={{padding:"16px 12px",display:"flex",flexDirection:"column",gap:6}}>
            {[70,90,55,80,65,75].map((w,i)=>(
              <div key={i} style={{height:6,width:`${w}%`,background:"rgba(255,255,255,0.12)",borderRadius:3}}/>
            ))}
          </div>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:44}}>📄</span></div>
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8}}>
          {steps.map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,background:i<vis?"rgba(0,188,212,0.09)":"rgba(255,255,255,0.02)",border:`1.5px solid ${i<vis?"rgba(0,188,212,0.25)":"rgba(255,255,255,0.04)"}`,borderRadius:12,padding:"10px 14px",transition:"all 0.4s",opacity:i<vis?1:0.25}}>
              <span style={{fontSize:17}}>{i<vis?(i<steps.length-1?"✅":"⏳"):icons[i]}</span>
              <span style={{color:i<vis?"white":"rgba(255,255,255,0.26)",fontSize:13,fontWeight:600}}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scan{0%{top:-3px}50%{top:calc(100% + 3px)}100%{top:-3px}}`}</style>
    </Shell>
  );
}

function AidResult({ onApprove, onBack }) {
  return (
    <Shell>
      <Bar onBack={onBack} grad={`linear-gradient(135deg,${C.teal},${C.t2})`}/>
      <div style={{flex:1,padding:"18px 16px",overflow:"auto",display:"flex",flexDirection:"column",gap:13}}>
        <Bubble style={{fontSize:16,lineHeight:1.7,borderColor:"#B2EBF2"}}>
          어머님, 좋은 소식이에요! 🎉<br/>
          장기요양 3등급으로 <span style={{color:C.t2,fontWeight:900}}>90% 지원</span>을 받으실 수 있어요!
        </Bubble>
        <div style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 5px 20px rgba(0,0,0,0.07)"}}>
          <div style={{background:"linear-gradient(135deg,#E8F5E9,#E3F2FD)",padding:"20px",display:"flex",alignItems:"center",justifyContent:"center",gap:16}}>
            <span style={{fontSize:60}}>🦯</span>
            <div>
              <div style={{fontSize:15,fontWeight:900,color:C.dark}}>최신형 보행보조기</div>
              <div style={{fontSize:12,color:C.gray}}>(실버카)</div>
              <div style={{fontSize:11,color:C.t2,marginTop:2}}>✓ 장기요양 급여 품목</div>
            </div>
          </div>
          <div style={{padding:"16px"}}>
            {[{l:"원래 가격",v:"150,000원",c:C.gray,th:true},{l:"나라 지원금",v:"−135,000원 (90%)",c:C.g2},{l:"내가 낼 돈",v:"15,000원",c:C.primary,big:true}].map(it=>(
              <div key={it.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:`${it.big?"12px":"9px"} 0`,borderBottom:it.big?"none":"1px solid #F5F5F5",borderTop:it.big?"2px solid "+C.light:"none"}}>
                <span style={{fontSize:it.big?15:13,fontWeight:it.big?900:600,color:it.big?C.dark:C.gray}}>{it.l}</span>
                <span style={{fontSize:it.big?22:13,fontWeight:it.big?900:700,color:it.c,textDecoration:it.th?"line-through":"none"}}>{it.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(46,204,113,0.09),rgba(0,188,212,0.07))",border:"1.5px solid rgba(46,204,113,0.2)",borderRadius:13,padding:"12px 15px",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>🎊</span>
          <div><div style={{fontSize:14,fontWeight:900,color:C.g2}}>135,000원 절약!</div><div style={{fontSize:12,color:C.gray}}>나라 지원 덕분에 이렇게 아끼셨어요</div></div>
        </div>
        <Btn onClick={onApprove} c={C.blue} c2={C.b2} style={{fontSize:17}}>네, 아들에게 사달라고 할게 👨</Btn>
        <div style={{textAlign:"center",color:C.gray,fontSize:12}}>승인 버튼을 누르면 아드님께 결제창이 전달됩니다.</div>
      </div>
    </Shell>
  );
}

function AidChildScreen({ onApprove, onCall }) {
  return (
    <Shell>
      <div style={{background:"linear-gradient(135deg,#1a1a2e,#0a1628)",padding:"12px 15px",display:"flex",alignItems:"flex-start",gap:10,flexShrink:0}}>
        <div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${C.teal},${C.t2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>🦯</div>
        <div><div style={{color:"rgba(255,255,255,0.44)",fontSize:11}}>효도 AI • 방금 전</div><div style={{color:"white",fontSize:12,fontWeight:600,lineHeight:1.5}}>어머님의 보조기기 국가지원 신청 건이 도착했습니다. 승인 시 15,000원만 결제됩니다.</div></div>
      </div>
      <div style={{flex:1,padding:"16px 15px",overflow:"auto",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${C.teal},${C.t2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>🏛️</div>
          <div><div style={{fontSize:15,fontWeight:900,color:C.dark}}>보조기기 구매 승인</div><div style={{fontSize:12,color:C.gray}}>노인장기요양보험 복지용구</div></div>
          <div style={{marginLeft:"auto",background:"#E0F7FA",color:C.t2,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700}}>국가지원</div>
        </div>
        <div style={{background:"white",borderRadius:17,overflow:"hidden",boxShadow:"0 4px 13px rgba(0,0,0,0.06)"}}>
          <div style={{background:"linear-gradient(135deg,#E0F7FA,#E8F5E9)",padding:"14px 16px",display:"flex",alignItems:"center",gap:13}}>
            <span style={{fontSize:44}}>🦯</span>
            <div><div style={{fontSize:14,fontWeight:900,color:C.dark}}>최신형 보행보조기</div><div style={{fontSize:12,color:C.gray}}>실버카 · 복지용구 인증품</div></div>
          </div>
          <div style={{padding:"12px 15px"}}>
            {[["원래 가격","150,000원"],["국가 지원","135,000원 (90%)"],["실 결제액","15,000원"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F5F5F5"}}>
                <span style={{fontSize:13,color:C.gray}}>{l}</span>
                <span style={{fontSize:13,fontWeight:l==="실 결제액"?900:700,color:l==="실 결제액"?C.primary:C.dark}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:"white",borderRadius:15,padding:"13px 15px",boxShadow:"0 3px 10px rgba(0,0,0,0.04)"}}>
          <div style={{fontSize:12,fontWeight:800,color:C.dark,marginBottom:10}}>📋 자격 확인 결과</div>
          {[["✅","장기요양등급","3등급 확인됨"],["✅","연간 한도 잔액","잔액 충분"],["✅","처방전","인증 완료"]].map(([ic,l,v])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,background:"#F1FFF5",borderRadius:8,padding:"8px 10px"}}>
              <span style={{fontSize:15}}>{ic}</span>
              <div><div style={{fontSize:12,fontWeight:800,color:C.dark}}>{l}</div><div style={{fontSize:11,color:C.gray}}>{v}</div></div>
            </div>
          ))}
        </div>
        <Btn onClick={onApprove} c={C.green} c2={C.g2} style={{fontSize:16}}>🏛️ 지원금 받고 결제 승인 (15,000원)</Btn>
        <Btn onClick={onCall} c={C.yellow} c2={C.y2} style={{fontSize:15,padding:"15px"}}>📞 전화해서 물어보기</Btn>
      </div>
    </Shell>
  );
}

function AidDone({ onReset }) {
  const [show, setShow] = useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),100);},[]);
  return (
    <Shell>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"30px 20px",background:`radial-gradient(ellipse at 50% 24%,rgba(0,188,212,0.09) 0%,transparent 60%),${C.cream}`}}>
        <div style={{display:"flex",gap:13,marginBottom:24,transform:show?"translateY(0)":"translateY(16px)",opacity:show?1:0,transition:"all 0.5s"}}>
          <div style={{width:74,height:74,borderRadius:"50%",background:`linear-gradient(135deg,${C.teal},${C.t2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,boxShadow:"0 6px 20px rgba(0,188,212,0.32)"}}>😊</div>
          <div style={{width:74,height:74,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.p2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,boxShadow:"0 6px 20px rgba(255,107,53,0.32)"}}>📦</div>
        </div>
        <div style={{fontSize:24,fontWeight:900,color:C.dark,textAlign:"center",lineHeight:1.35,marginBottom:8,opacity:show?1:0,transform:show?"translateY(0)":"translateY(12px)",transition:"all 0.5s 0.2s"}}>신청이 완료되었습니다!</div>
        <div style={{fontSize:13,color:C.gray,textAlign:"center",lineHeight:1.7,marginBottom:22,opacity:show?1:0,transition:"opacity 0.5s 0.35s"}}>며칠 뒤 <strong>집으로 택배</strong>가 올 거예요. 📦<br/>아드님께서 15,000원 결제를 완료하셨습니다.</div>
        <div style={{width:"100%",background:"white",borderRadius:16,padding:"14px 18px",boxShadow:"0 4px 16px rgba(0,0,0,0.06)",marginBottom:12,opacity:show?1:0,transition:"opacity 0.5s 0.45s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <span style={{fontSize:15,fontWeight:900,color:C.dark}}>🦯 보행보조기</span>
            <span style={{background:"#E0F7FA",color:C.t2,borderRadius:8,padding:"3px 9px",fontSize:12,fontWeight:700}}>신청완료</span>
          </div>
          <div style={{fontSize:12,color:C.gray,lineHeight:1.6}}>국가 지원 135,000원 적용 · 실 결제 15,000원<br/>예상 배송: 영업일 기준 3~5일</div>
        </div>
        <div style={{width:"100%",background:"linear-gradient(135deg,rgba(0,188,212,0.07),rgba(255,107,53,0.05))",border:"1.5px solid rgba(0,188,212,0.17)",borderRadius:15,padding:"13px 16px",marginBottom:20,opacity:show?1:0,transition:"opacity 0.5s 0.55s"}}>
          <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:4}}>📹 기기 도착 후 안내</div>
          <div style={{fontSize:12,color:C.gray,lineHeight:1.6}}>기기가 도착하면 <strong style={{color:C.t2}}>사용 방법을 동영상</strong>으로 보여드릴게요!</div>
        </div>
        <div style={{width:"100%",display:"flex",gap:9,opacity:show?1:0,transition:"opacity 0.5s 0.65s"}}>
          <button onClick={onReset} style={{flex:1,background:`linear-gradient(135deg,${C.teal},${C.t2})`,border:"none",borderRadius:13,padding:"13px",color:"white",fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 13px rgba(0,188,212,0.32)"}}>고마워 😊</button>
          <button onClick={onReset} style={{flex:1,background:C.light,border:"none",borderRadius:13,padding:"13px",color:C.gray,fontSize:15,fontWeight:700,cursor:"pointer"}}>나중에 봐</button>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════
   🏠 홈 화면
══════════════════════════════════════════════ */
function HomeScreen({ onFlow }) {
  const cards = [
    { id:"train", icon:"🚂", label:"기차표 예매", sub:"KTX·무궁화 예매해드려요", grad:`linear-gradient(135deg,${C.blue},${C.b2})` },
    { id:"hosp",  icon:"🏥", label:"병원 예약",   sub:"가까운 병원 찾아 예약해드려요", grad:`linear-gradient(135deg,${C.purple},${C.pu2})` },
    { id:"taxi",  icon:"🚕", label:"택시 호출",   sub:"바로 부르고 자동 결제", grad:`linear-gradient(135deg,${C.yellow},${C.y2})` },
    { id:"aid",   icon:"🦯", label:"보조기기 지원", sub:"나라에서 90%까지 지원", grad:`linear-gradient(135deg,${C.teal},${C.t2})` },
  ];
  return (
    <Shell>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.primary},${C.p2})`,padding:"13px 22px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexShrink:0}}>
        <div style={{width:34}}/>
        <div style={{textAlign:"center"}}>
          <Av size={64} pulse/>
          <div style={{color:"white",fontWeight:900,fontSize:16,marginTop:7}}>효도 AI · 지혜</div>
          <div style={{color:"rgba(255,255,255,0.82)",fontSize:12,marginTop:3,background:"rgba(255,255,255,0.15)",borderRadius:20,padding:"3px 11px",display:"inline-block"}}>항상 곁에 있을게요 💛</div>
        </div>
        <button style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:34,height:34,color:"white",fontSize:17,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🔍</button>
      </div>

      <div style={{flex:1,padding:"22px 18px 0",overflow:"auto"}}>
        <div style={{fontSize:28,fontWeight:900,color:C.dark,textAlign:"center",lineHeight:1.3,marginBottom:6}}>무엇을<br/>도와드릴까요?</div>
        <div style={{fontSize:14,color:C.gray,marginBottom:22,textAlign:"center"}}>원하시는 것을 눌러주세요</div>

        {/* Mic */}
        <div onClick={()=>onFlow("train")} style={{width:160,height:160,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.p2})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",margin:"0 auto 24px",boxShadow:"0 0 0 14px rgba(255,107,53,0.1),0 0 0 28px rgba(255,107,53,0.05),0 12px 36px rgba(255,107,53,0.43)",animation:"breathe 2.8s ease-in-out infinite"}}>
          <span style={{fontSize:64,lineHeight:1}}>🎤</span>
          <span style={{color:"white",fontSize:16,fontWeight:800,marginTop:5}}>말하기</span>
        </div>

        {/* 4 shortcut cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {cards.map(card=>(
            <div key={card.id} onClick={()=>onFlow(card.id)} style={{background:"white",borderRadius:18,padding:"16px 14px",display:"flex",flexDirection:"column",gap:8,boxShadow:"0 4px 16px rgba(0,0,0,0.07)",border:"1.5px solid rgba(0,0,0,0.05)",cursor:"pointer",transition:"transform 0.15s"}}>
              <div style={{width:46,height:46,borderRadius:13,background:card.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>
                {card.icon}
              </div>
              <div style={{fontSize:14,fontWeight:900,color:C.dark}}>{card.label}</div>
              <div style={{fontSize:11,color:C.gray,lineHeight:1.4}}>{card.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SOS */}
      <div style={{padding:"16px 18px 28px",display:"flex",flexDirection:"column",gap:8}}>
        <div style={{textAlign:"center",color:C.gray,fontSize:13}}>말씀만 하세요, 나머지는 제가 다 할게요.</div>
        <button onClick={()=>alert("자녀에게 즉시 연결합니다! 📞")} style={{background:`linear-gradient(135deg,${C.red},${C.r2})`,border:"none",borderRadius:18,padding:"18px",color:"white",fontSize:20,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:11,boxShadow:"0 6px 22px rgba(229,57,53,0.38)",letterSpacing:"1px"}}>
          <span style={{fontSize:24}}>🆘</span> SOS
        </button>
        <div style={{textAlign:"center",color:C.gray,fontSize:12}}>자녀에게 즉시 연결됩니다.</div>
      </div>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}} @keyframes pr{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.18);opacity:0.3}}`}</style>
    </Shell>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
const FLOWS = {
  train: {
    label:"🚂 기차 예매",
    screens:["listen","proc","confirm","child","done"],
    labels:["② 음성","③ 처리","④ 확인","⑤ 자녀","⑥ 완료"],
    grad:`linear-gradient(135deg,${C.blue},${C.b2})`,
  },
  hosp: {
    label:"🏥 병원 예약",
    screens:["listen","proc","confirm","child","done"],
    labels:["② 음성","③ 처리","④ 확인","⑤ 자녀","⑥ 완료"],
    grad:`linear-gradient(135deg,${C.purple},${C.pu2})`,
  },
  taxi: {
    label:"🚕 택시 호출",
    screens:["listen","proc","confirm","done"],
    labels:["② 음성","③ 처리","④ 확인","⑤ 완료"],
    grad:`linear-gradient(135deg,${C.yellow},${C.y2})`,
  },
  aid: {
    label:"🦯 보조기기",
    screens:["consult","survey","cam","ocr","result","child","done"],
    labels:["① 상담","② 설문","③ 촬영","④ OCR","⑤ 결과","⑥ 자녀","⑦ 완료"],
    grad:`linear-gradient(135deg,${C.teal},${C.t2})`,
  },
};

export default function App() {
  const [flow, setFlow] = useState(null); // null = home
  const [step, setStep] = useState(0);
  const home = () => { setFlow(null); setStep(0); };
  const next = () => setStep(s=>s+1);

  const flowCfg = flow ? FLOWS[flow] : null;
  const stepId = flowCfg ? flowCfg.screens[step] : null;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#08080f 0%,#0d1a2e 55%,#08131f 100%)",display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 14px 52px",fontFamily:"'Noto Sans KR',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800;900&display=swap'); *{box-sizing:border-box} button:active{opacity:0.84;transform:scale(0.97)}`}</style>

      {/* 타이틀 */}
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{fontSize:34,fontWeight:900,color:"white",letterSpacing:"-1px",marginBottom:3}}>🤍 효도 AI</div>
        <div style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>말만 하세요, 나머지는 제가 다 할게요.</div>
      </div>

      {/* 플로우 탭 */}
      <div style={{display:"flex",gap:7,flexWrap:"wrap",justifyContent:"center",marginBottom:12}}>
        <button onClick={home} style={{background:!flow?`linear-gradient(135deg,${C.primary},${C.p2})`:"rgba(255,255,255,0.07)",border:!flow?"none":"1px solid rgba(255,255,255,0.09)",borderRadius:14,padding:"8px 14px",color:!flow?"white":"rgba(255,255,255,0.44)",fontSize:12,fontWeight:800,cursor:"pointer",transition:"all 0.2s"}}>🏠 홈</button>
        {Object.entries(FLOWS).map(([id,cfg])=>(
          <button key={id} onClick={()=>{ setFlow(id); setStep(0); }} style={{background:flow===id?cfg.grad:"rgba(255,255,255,0.07)",border:flow===id?"none":"1px solid rgba(255,255,255,0.09)",borderRadius:14,padding:"8px 14px",color:flow===id?"white":"rgba(255,255,255,0.44)",fontSize:12,fontWeight:800,cursor:"pointer",transition:"all 0.2s",boxShadow:flow===id?"0 4px 14px rgba(0,0,0,0.3)":"none"}}>{cfg.label}</button>
        ))}
      </div>

      {/* 스텝 네비 */}
      {flow && (
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:22}}>
          <button onClick={home} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:9,padding:"5px 11px",color:"rgba(255,255,255,0.4)",fontSize:11,fontWeight:700,cursor:"pointer"}}>① 홈</button>
          {flowCfg.screens.map((sc,i)=>(
            <button key={sc} onClick={()=>setStep(i)} style={{background:step===i?flowCfg.grad:"rgba(255,255,255,0.07)",border:step===i?"none":"1px solid rgba(255,255,255,0.08)",borderRadius:9,padding:"5px 11px",color:step===i?"white":"rgba(255,255,255,0.4)",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.18s"}}>{flowCfg.labels[i]}</button>
          ))}
        </div>
      )}

      {/* 화면 렌더 */}
      <div key={`${flow}-${step}`} style={{animation:"fi 0.3s ease"}}>
        {/* HOME */}
        {!flow && <HomeScreen onFlow={id=>{ setFlow(id); setStep(0); }}/>}

        {/* 🚂 기차 */}
        {flow==="train" && stepId==="listen"   && <ListenScreen phrase="얘야, 이번 주 일요일 부산 가는 기차표 하나 예매해줘" onDone={next}/>}
        {flow==="train" && stepId==="proc"     && <ProcScreen steps={["목소리 인식 완료","KTX 앱 실행 중...","좌석 검색 중...","결제 창 준비 중..."]} icons={["🎤","🚂","💺","💳"]} onDone={next} onBack={home}/>}
        {flow==="train" && stepId==="confirm"  && <TrainConfirm onApprove={next} onRetry={()=>setStep(0)} onBack={home}/>}
        {flow==="train" && stepId==="child"    && (
          <ChildScreen
            push="어머님께서 KTX-산천 121 부산행 예매를 요청하셨습니다. (총 59,800원)"
            rows={[
              ["👴 요청자","김말자님"],
              ["🚂 열차","KTX-산천 121"],
              ["🕑 시간","서울 11:30 → 부산 14:15"],
              ["💺 좌석","8호차 12C (창가)"],
              ["💰 금액","59,800원"],
              ["💳 카드","XXXX-1234"],
            ]}
            onApprove={next}
            onReject={home}
          />
        )}
        {flow==="train" && stepId==="done"     && (
          <DoneScreen
            title="예매가 완료되었습니다!"
            sub={"따님께서 결제를 승인하셨습니다.\nKTX-산천 121 부산행 예매 내역을 문자로 보내드렸어요. 📱"}
            cardTitle="🚂 KTX-산천 121 부산행"
            cardSub="서울 11:30 → 부산 14:15 · 8호차 12C (창가) · 59,800원"
            cardBadge="예매완료"
            badgeColor="#E3F2FD"
            onReset={home}
          />
        )}

        {/* 🏥 병원 */}
        {flow==="hosp" && stepId==="listen"   && <ListenScreen phrase="얘야, 무릎이 너무 아파. 근처 정형외과 예약 좀 해줘" onDone={next}/>}
        {flow==="hosp" && stepId==="proc"     && <ProcScreen steps={["목소리 인식 완료","근처 정형외과 검색 중...","예약 가능 시간 확인 중...","예약 확정 중..."]} icons={["🎤","🔍","📅","✅"]} onDone={next} onBack={home}/>}
        {flow==="hosp" && stepId==="confirm"  && <HospReservation onApprove={() => next()} onBack={home}/>}
        {flow==="hosp" && stepId==="child"    && <ChildScreen push="어머님께서 정형외과 예약을 요청하셨습니다. 내일 10:30 (진료비 3,000원)" rows={[["👴 요청자","홍길동 어머님"],["🏥 병원","서울 정형외과의원"],["📅 일시","내일 오전 10:30"],["💰 진료비","3,000원 (본인부담)"]]} onApprove={next} onReject={home}/>}
        {flow==="hosp" && stepId==="done"     && <HospDone onReset={home}/>}

        {/* 🚕 택시 */}
        {flow==="taxi" && stepId==="listen"   && <ListenScreen phrase="얘야, 택시 좀 불러줘. 마트 가야 해" onDone={next}/>}
        {flow==="taxi" && stepId==="proc"     && <ProcScreen steps={["목소리 인식 완료","카카오택시 앱 실행 중...","주변 택시 검색 중...","배차 준비 중..."]} icons={["🎤","🚕","📍","✅"]} onDone={next} onBack={home}/>}
        {flow==="taxi" && stepId==="confirm"  && <TaxiConfirm onApprove={next} onBack={home}/>}
        {flow==="taxi" && stepId==="done"     && <TaxiDone onReset={home}/>}

        {/* 🦯 보조기기 */}
        {flow==="aid" && stepId==="consult"   && <AidConsult onYes={next} onNo={home} onBack={home}/>}
        {flow==="aid" && stepId==="survey"    && <AidSurvey onDone={next} onBack={()=>setStep(0)}/>}
        {flow==="aid" && stepId==="cam"       && <AidCamera onCapture={next} onBack={()=>setStep(1)}/>}
        {flow==="aid" && stepId==="ocr"       && <AidOcr onDone={next}/>}
        {flow==="aid" && stepId==="result"    && <AidResult onApprove={next} onBack={()=>setStep(0)}/>}
        {flow==="aid" && stepId==="child"     && <AidChildScreen onApprove={next} onCall={()=>alert("📞 자녀에게 전화 연결 중...")}/>}
        {flow==="aid" && stepId==="done"      && <AidDone onReset={home}/>}
      </div>

      {!flow && <div style={{marginTop:16,color:"rgba(255,255,255,0.25)",fontSize:12,textAlign:"center"}}>👆 마이크 또는 카드를 눌러 각 플로우를 체험하세요</div>}
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
