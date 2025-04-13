import React, { useState, useEffect, useRef } from 'react';

export const AnimationExplainer = () => {
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(1); // アニメーション速度の係数
  const [isRunning, setIsRunning] = useState(false);
  
  // requestAnimationFrameのID参照を保持
  const rafIdRef = useRef<number>(0);
  
  // アニメーション関数 - フレームごとに呼ばれる
  const animate = () => {
    // カウンターを更新（速度係数を適用）
    setCount(prev => prev + speed);
    
    // 次のフレームをリクエスト
    rafIdRef.current = requestAnimationFrame(animate);
  };
  
  // アニメーションの開始/停止を制御
  useEffect(() => {
    if (isRunning) {
      // アニメーション開始
      rafIdRef.current = requestAnimationFrame(animate);
    } else if (rafIdRef.current) {
      // アニメーション停止
      cancelAnimationFrame(rafIdRef.current);
    }
    
    // クリーンアップ（コンポーネントがアンマウントされたとき）
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isRunning]);
  
  return (
    <div>
      <div>カウント: {Math.round(count)}</div>
      <input 
        type="range" 
        min="0.1" max="10" step="0.1" 
        value={speed}
        onChange={e => setSpeed(parseFloat(e.target.value))}
      />
      <div>速度: {speed}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '停止' : '開始'}
      </button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
};
  
export default AnimationExplainer;