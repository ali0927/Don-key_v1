export const InvestmentInput = ({
  value,
  setValue,
  max,
}: {
  value: string;
  setValue: (val: string) => void;
  max: number;
}) => {
  return (
    <div>
      <div className="invest_input">
        <div className="invest_input_currency">BUSD</div>
        <div>
          <input
            type="number"
            placeholder="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="invest_input_elm" />
        </div>
      </div>
      <div className="invest_percent">
        {[0, 20, 50, 80, 100].map((val) => {
          return (
            <span
              onClick={() => setValue(((val / 100) * max).toFixed(2))}
              style={{ opacity: val / 100 + 0.2 }}
            >
              {val}%
            </span>
          );
        })}
      </div>
    </div>
  );
};
