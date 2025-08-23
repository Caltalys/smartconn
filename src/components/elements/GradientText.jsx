// components/GradientText.jsx
export default function GradientText({ children, className = "" }) {
  return (
    <span
      className={`bg-gradient-to-r ${className} bg-clip-text`}
      style={{
        background: 'linear-gradient(90deg, white, #cccccc)',
      }}
    >
      {children}
    </span>
  );
}