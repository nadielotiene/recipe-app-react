// export default function Loading({ message = "Loading..." }) {
//   return (
//     <div className="loading-container">
//       <div className="spinner"></div>
//       <p>{message}</p>
//     </div>
//   )
// }


export default function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-container">
      <div 
        className="spinner"
        style={{
          width: '50px',
          height: '50px',
          border: '4px solid #ccc',
          borderTop: '4px solid #b16241',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      ></div>
      <p>{message}</p>
    </div>
  )
}