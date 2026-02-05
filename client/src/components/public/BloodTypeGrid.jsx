import BloodStockCard from './BloodStockCard';

const BloodTypeGrid = ({ stocks = [] }) => {
    // Use provided stocks or default mock data for visualization
    const displayStocks = stocks.length > 0 ? stocks : [
        { blood_type: 'A+', units: 45, status: 'adequate' },
        { blood_type: 'A-', units: 12, status: 'low' },
        { blood_type: 'B+', units: 28, status: 'adequate' },
        { blood_type: 'B-', units: 5, status: 'critical' },
        { blood_type: 'AB+', units: 15, status: 'low' },
        { blood_type: 'AB-', units: 3, status: 'critical' },
        { blood_type: 'O+', units: 52, status: 'adequate' },
        { blood_type: 'O-', units: 8, status: 'critical' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {displayStocks.map((stock, i) => (
                <BloodStockCard
                    key={i}
                    type={stock.blood_type}
                    units={stock.units}
                    status={stock.status}
                />
            ))}
        </div>
    );
};

export default BloodTypeGrid;
