import React, { useEffect, useState } from 'react';
import DateRangeSelector from './DateRangeSelector';
import CryptoCard from './Card';
import Modal from 'react-modal';
import DataTable from 'react-data-table-component';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    overflow: 'auto'
  }
};

function Dashboard() {
  const defaultStartDate = '2021-01-01';
  const defaultEndDate = '2021-03-01';

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [cryptoData, setCryptoData] = useState({}); 
  const [selectedPairData, setSelectedPairData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedCrypto,setSelectedCrypto] =useState({});

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    fetchCryptoData(start, end); 
  };

  useEffect(() => {
    fetchCryptoData(startDate, endDate); 
  }, []); 

  const fetchCryptoData = (start, end) => {
    const pairs = ['aave', 'elrond', 'litecoin', 'solana', 'btc', 'eth', 'etc'];

    Promise.all(
      pairs.map(pair =>
        fetch(`/${pair}?startDate=${start}&endDate=${end}`)
          .then(response => response.json())
          .then(data => ({ pair, data }))
      )
    )
      .then(results => {
        const cryptoDataObj = {};
        results.forEach(({ pair, data }) => {
          cryptoDataObj[pair] = data;
        });
        setCryptoData(cryptoDataObj);
      })
      .catch(error => {
        console.error('Error fetching crypto data:', error);
      });
  };

  const handleCardClick = (pair, data) => {
    console.log(pair)
    setSelectedPairData(data.data);
    setSelectedCrypto(pair)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Price', selector: row => row.price, sortable: true },
    { name: 'Open', selector: row => row.open, sortable: true },
    { name: 'High', selector: row => row.high, sortable: true },
    { name: 'Low', selector: row => row.low, sortable: true },
    { name: 'Volume', selector: row => row.volume, sortable: true },
    { name: 'Change (%)', selector: row => row.change_percent, sortable: true }
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Cryptocurrency Dashboard</h1>
      <DateRangeSelector onDateRangeChange={handleDateRangeChange} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(cryptoData).map(([pair, data]) => (
          <div key={pair} style={{ margin: '10px' }} onClick={() => handleCardClick(pair, data)}>
            <CryptoCard pair={pair.toUpperCase()} data={data} />
          </div>
        ))}
      </div>
      {/* Modal for displaying detailed data */}
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={customModalStyles}>
        <h2>{typeof selectedCrypto === 'string'  ? `Data Table for ${selectedCrypto.toUpperCase()}` : ''}</h2>
        {selectedPairData && (
          <DataTable
            columns={columns}
            data={selectedPairData}
            defaultSortField="date"
            defaultSortAsc={false}
            pagination
          />
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;
