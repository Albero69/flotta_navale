import { Treemap } from 'recharts';

const COLORS = {
  'Portaerei': '#e74c3c',
  'Incrociatore': '#3498db',
  'Cacciatorpediniere': '#2ecc71',
  'Sottomarino': '#f39c12',
};

const NaviTreemap = ({ navi }) => {
  const raggruppaNavi = () => {
    const grouped = {};
    
    navi.forEach(nave => {
      if (!grouped[nave.tipologia]) {
        grouped[nave.tipologia] = {
          name: nave.tipologia,
          children: []
        };
      }
      grouped[nave.tipologia].children.push({
        name: nave.nome,
        size: parseInt(nave.stazza), 
        tipologia: nave.tipologia
      });
    });

    return Object.values(grouped);
  };

  if (!navi || navi.length === 0) {
    return <div className="no-data">Nessuna nave disponibile</div>;
  }

  return (
    <div className="treemap-container">
      <h2>Visualizzazione Flotta</h2>
      <Treemap
        width={600}
        height={400}
        data={raggruppaNavi()}
        dataKey="size"
        stroke="#fff"
        content={({ x, y, width, height, name, size, tipologia }) => {
          const color = COLORS[tipologia] || COLORS[name] || '#95a5a6';
          const minDimension = Math.min(width, height);
          const fontSize = Math.max(8, Math.min(12, minDimension / 8));
          const showStazza = width > 40 && height > 25;
          
          return (
            <g>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={color}
                stroke="#fff"
                strokeWidth={2}
              />
              {width > 30 && height > 20 && (
                <>
                  <text
                    x={x + width / 2}
                    y={y + height / 2 + (showStazza ? -3 : 3)}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={fontSize}
                    fontWeight="bold"
                  >
                    {name.length > 15 && width < 80 ? name.substring(0, 12) + '...' : name}
                  </text>
                  {showStazza && (
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + fontSize + 2}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={fontSize * 0.8}
                    >
                      {size} t
                    </text>
                  )}
                </>
              )}
            </g>
          );
        }}
      />
      
      <div className="legend">
        {Object.entries(COLORS).map(([tipo, colore]) => (
          <div key={tipo} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: colore }}></span>
            <span>{tipo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NaviTreemap;