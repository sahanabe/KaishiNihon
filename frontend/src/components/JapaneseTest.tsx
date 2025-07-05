import React from 'react';

const JapaneseTest: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Japanese Character Test</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Hiragana Test:</h3>
          <div className="text-4xl japanese-character">
            あ い う え お か き く け こ
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Katakana Test:</h3>
          <div className="text-4xl japanese-character">
            ア イ ウ エ オ カ キ ク ケ コ
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Table Test:</h3>
          <table className="w-full japanese-table border">
            <tbody>
              <tr>
                <td className="p-2 border">あ</td>
                <td className="p-2 border">い</td>
                <td className="p-2 border">う</td>
                <td className="p-2 border">え</td>
                <td className="p-2 border">お</td>
              </tr>
              <tr>
                <td className="p-2 border">ア</td>
                <td className="p-2 border">イ</td>
                <td className="p-2 border">ウ</td>
                <td className="p-2 border">エ</td>
                <td className="p-2 border">オ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JapaneseTest; 