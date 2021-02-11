import React, { useState, useEffect, Fragment } from 'react';
import API from '../utils/API';
import Spinner from './Spinner';
const Coins = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Symbol: '',
    Name: '',
    Hashing_algorithm: '',
    Description: '',
    Market_data: '',
    Homepage: '',
    Genesis_date: '',
  });

  //FetchCoin Function will fetch coin data by id. Id will get through url using match.
  const fetchCoins = async () => {
    setLoading(true);
    const response = await API.get(`/coins/${match.params.id}`);
    //on successfull response binding data to formdata to avoid any errors
    if (response.status === 200) {
      setFormData({
        Symbol: response.data.symbol,
        Name: response.data.name,
        Hashing_algorithm: response.data.hashing_algorithm,
        Description: response.data.description.en,
        Market_data: response.data.market_data.market_cap.eur,
        Homepage: response.data.links.homepage[0],
        Genesis_date: response.data.genesis_date,
      });
    }

    setLoading(false);
  };

  //Using below hook to call api and bind data to form on page load.
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    //Showing loadder till we dont get data/response from api.
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='wrapper'>
            {/* Content Wrapper. Contains page content */}
            <div className='content-wrapper'>
              {/* Content Header (Page header) */}
              <section className='content-header'>
                <div className='container-fluid'>
                  <div className='row mb-2'>
                    <div className='col-sm-12'>
                      <h1>Market :- {match.params.id} details</h1>
                    </div>
                  </div>
                </div>
                {/* /.container-fluid */}
              </section>
              {/* Main content */}
              <section className='content'>
                <div className='container-fluid'>
                  <div className='row'>
                    {/* left column */}
                    <div className='col-md-12'>
                      {/* general form elements */}
                      <div className='card card-primary'>
                        {/* <div className='card-header'>
                        <h3 className='card-title'>Quick Example</h3>
                      </div> */}
                        {/* /.card-header */}
                        {/* form start */}
                        <form role='form'>
                          <div className='card-body'>
                            <div className='form-group'>
                              <div className='row col-md-12'>
                                <div className='col-md-2'>
                                  <label>Name</label>
                                </div>

                                <div className='col-md-8'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='name'
                                    value={formData.Name}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className='row col-md-12 mt-3'>
                                <div className='col-md-2'>
                                  <label htmlFor='Symbol'>Symbol</label>
                                </div>

                                <div className='col-md-8'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='symbol'
                                    value={formData.Symbol}
                                    disabled={true}
                                    //onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </div>
                              <div className='row col-md-12 mt-3'>
                                <div className='col-md-2'>
                                  <label htmlFor='Hashingalgorithm'>
                                    Hashing algorithm
                                  </label>
                                </div>

                                <div className='col-md-8'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='hashing_algorithm'
                                    value={formData.Hashing_algorithm}
                                    disabled={true}
                                    //onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </div>
                              <div className='row col-md-12 mt-3'>
                                <div className='col-md-2'>
                                  <label htmlFor='Description'>
                                    Description
                                  </label>
                                </div>
                                <div className='col-md-8'>
                                  <textarea
                                    className='form-control'
                                    disabled={true}
                                    value={formData.Description}
                                  ></textarea>
                                </div>
                              </div>
                              <div className='row col-md-12 mt-3'>
                                <div className='col-md-2'>
                                  <label htmlFor='MarketcapinEuro'>
                                    Market cap in Euro
                                  </label>
                                </div>
                                <div className='col-md-8'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='market_data'
                                    value={formData.Market_data}
                                    disabled={true}
                                    //onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </div>
                              <div className='row col-md-12 mt-3'>
                                <div className='col-md-2'>
                                  <label htmlFor='Homepage'>Homepage</label>
                                </div>
                                <div className='col-md-1'>
                                  <a href={formData.Homepage} target='_blank'>
                                    Homepage
                                  </a>
                                </div>
                              </div>
                              <div className='row col-md-12 mt-3'>
                                <div className='col-md-2'>
                                  <label htmlFor='GenesisDate'>
                                    Genesis Date
                                  </label>
                                </div>
                                <div className='col-md-8'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='market_data'
                                    value={formData.Genesis_date}
                                    disabled={true}
                                    //onChange={(e) => onChange(e)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Coins;
