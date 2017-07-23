import React from 'react'
import ReactDOM from 'react-dom'
import { 
  Button,
  ButtonToolbar,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal,
  Table,
} from 'react-bootstrap'
import _ from 'lodash';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class QuotePage extends React.Component{
  state = {
    client: this.props.client.firstname + ' ' + this.props.client.lastname,
    quoteId: 123,
    orderAmount: 5000,
    currency: '',
    exchange1: {
      name: '',
      bestPrice: 0,
    },
    exchange2: {
      name: '',
      bestPrice: 0,
    },
    average: 0,
    spotPrice: 0,
    commission: 0,
    totalPerCoin: 0,
    totalCoins: 0,
    emailModal: false,
  };

  setPrices = (e) => {
    if (!_.isEmpty(e)) {
      e.preventDefault();
    } 

    let exchange1, exchange2;
    const currency = ReactDOM.findDOMNode(this.refs.currency).value;

    if (currency === 'Bitcoin') {
        exchange1 = {
          name: 'ACX',
          bestPrice: this.props.ausPrices.BTC.acxBestBTC,
        };
        exchange2 = {
          name: 'BTC Markets',
          bestPrice: this.props.ausPrices.BTC.btcmBestBTC,
        };
    } else if (currency === 'Ethereum') {
        exchange1 = {
          name: 'BTC Markets',
          bestPrice: this.props.ausPrices.ETH.btcmBestETH,
        };
        exchange2 = {
          name: 'Independent Reserve',
          bestPrice: this.props.ausPrices.ETH.irBestETH,
        };
    }
    let average = ((exchange1.bestPrice + exchange2.bestPrice) / 2).toFixed(2);
    this.setState({
      currency,
      exchange1,
      exchange2,
      average,
    });
  }

  // Generate the quote pdf using the values in the state
  makePdf = (emailProps) => {
		var docDefinition = {
      pageSize: 'A4',

      content: [
        { text: 'Caleb & Brown', fontSize: 24 },
        { text: 'Cryptocurrency Brokers', fontSize: 15, margin: [0,0,0,20] },

        { text: 'Client: ' + this.state.client },
        { text: 'Quote ID: ' + this.state.quoteId},
        { text: 'Currency: ' + this.state.currency},
        { text: 'Order Amount: ' + this.state.orderAmount, margin: [0,0,0,20]},

        {
          table: {
            widths: [ 'auto', 'auto'],
            body: [
              [ 'Fair Price 1', this.state.exchange1.bestPrice ],
              [ 'Fair Price 2', this.state.exchange2.bestPrice ],
              [ 'Average Price', this.state.average ],
              [ 'Spot Price', this.state.spotPrice ],
              [ 'Commission', this.state.commission ],
              [ { text: 'Total Per Coin', bold: true }, this.state.totalPerCoin ],
              [ { text: 'Total Coins', bold: true }, this.state.totalCoins ],
            ]
          }
        }
      ],
    };

    // Encode the pdf in base64 and send it to the mail API
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBase64((data) => {
      emailProps.file = data;
      this.props.onSend(emailProps);
    })
  }

  submitSendMail = (event) => {
    event.preventDefault()
    const subject = 'Caleb & Brown Brokerage Quote'
    const text = ReactDOM.findDOMNode(this.refs.emailMessage).value;
    const email = ReactDOM.findDOMNode(this.refs.clientEmail).value;
    const emailProps = {
      email: email,
      subject: subject,
      text: text,
      file: 0,
    }
    this.makePdf(emailProps);
  }

  handleChange = (e) => {
    const spotPrice = ReactDOM.findDOMNode(this.refs.spotPrice).value;
    const commission = ReactDOM.findDOMNode(this.refs.commission).value;
    const orderAmount = ReactDOM.findDOMNode(this.refs.orderAmount).value;
    const exchange1Value = ReactDOM.findDOMNode(this.refs.exchange1BestPrice).value;
    const exchange2Value = ReactDOM.findDOMNode(this.refs.exchange2BestPrice).value;
    const exchange1 = {bestPrice: exchange1Value};
    const exchange2 = {bestPrice: exchange2Value};
    
    this.setState({
      spotPrice,
      commission,
      orderAmount,
      exchange1,
      exchange2,
    }, () => this.updateTotal()
    );
  }

  updateTotal = () => {
    const spotPrice = parseFloat(this.state.spotPrice);
    const commission = parseFloat(this.state.commission);
    const exchange1BestPrice = parseFloat(this.state.exchange1.bestPrice);
    const exchange2BestPrice = parseFloat(this.state.exchange2.bestPrice);
    const orderAmount = parseFloat(this.state.orderAmount);
    const average = (exchange1BestPrice + exchange2BestPrice) / 2;
    const totalPerCoin = spotPrice + (spotPrice * (commission / 100));
    const totalCoins = (orderAmount / totalPerCoin).toFixed(8) 

    this.setState({
      average,
      totalPerCoin,
      totalCoins,
    });
  }

  showEmailModal = (event) => {
    event.preventDefault();
    this.setState({ emailModal: true });
  }

  hideEmailModal = () => {
    this.setState({ emailModal: false });
  }

  render() {
    const {
      average,
      client,
      commission,
      currency,
      exchange1,
      exchange2,
      orderAmount,
      quoteId,
      spotPrice,
      totalCoins,
      totalPerCoin,
      emailModal,
    } = this.state;

    return (
      <div style={{display: 'flex', margin: '2rem'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: '25%'}}>
          <Form horizontal style={{color: '#969696'}}>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={4}>
                Client
              </Col>
              <Col componentClass={ ControlLabel } sm={8}>
                <FormControl
                  type="text" 
                  ref="orderAmount"
                  value={ client }
                />
              </Col>
            
              <Col componentClass={ ControlLabel } sm={4}>
                Coin 
              </Col>
              <Col componentClass={ ControlLabel } sm={8}>
                <FormControl
                  bsSize="md"
                  componentClass="select"
                  placeholder="select"
                  ref="currency"
                  onChange={(e) => this.setPrices(e)}>
                >
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                </FormControl>
              </Col>

              <Col componentClass={ ControlLabel } sm={4}>
                Order Amount 
              </Col>
              <Col componentClass={ ControlLabel } sm={8}>
                <FormControl
                  type="text" 
                  ref="orderAmount"
                  value={ orderAmount }
                  onChange={ this.handleChange }
                />
              </Col>
            </FormGroup>
          </Form>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', width: '25%'}}>
          <Form horizontal style={{color: '#969696'}}>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={6}>
                Fair Price 1
              </Col>
              <Col componentClass={ ControlLabel } sm={6}>
                <FormControl
                  type="text" 
                  ref="exchange1BestPrice"
                  value={ exchange1.bestPrice }
                  onChange={ this.handleChange }
                />
              </Col>

              <Col componentClass={ ControlLabel } sm={6}>
                Fair Price 2
              </Col>
              <Col componentClass={ ControlLabel } sm={6}>
                <FormControl
                  type="text" 
                  ref="exchange2BestPrice"
                  value={ exchange2.bestPrice }
                  onChange={ this.handleChange }
                />
              </Col>

              <Col componentClass={ ControlLabel } sm={6}>
                Average Price 
              </Col>
              <Col componentClass={ ControlLabel } sm={6}>
                <FormControl
                  type="text" 
                  ref="average"
                  value={ average }
                />
              </Col>

              <Col componentClass={ ControlLabel } sm={6}>
                Commission %
              </Col>
              <Col componentClass={ ControlLabel } sm={6}>
                <FormControl
                  type="text" 
                  ref="commission"
                  value={ commission }
                  onChange={ this.handleChange }
                />
              </Col>

              <Col componentClass={ ControlLabel } sm={6}>
                Spot Price
              </Col>
              <Col componentClass={ ControlLabel } sm={6}>
                <FormControl
                  type="text"
                  ref="spotPrice"
                  value={ spotPrice }
                  placeholder="Spot Price"
                  onChange={ this.handleChange }
                />
              </Col>

              <Col componentClass={ ControlLabel } sm={6}>
                Total Per Coin
              </Col>
              <Col componentClass={ ControlLabel } sm={6}>
                <FormControl 
                  type="text" 
                  ref="totalPerCoin" 
                  value={ totalPerCoin }/>
              </Col>

              <Col componentClass={ ControlLabel } sm={6}>
                Total Coins
              </Col>
              <Col componentClass={ ControlLabel } sm={6}>
                <FormControl 
                  type="text" 
                  ref="totalCoins" 
                  value={ totalCoins }/>
              </Col>
            </FormGroup>
          </Form>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', width: '55%'}}>
          <Form horizontal style={{color: '#969696'}}>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={3}>
                Client Email
              </Col>
              <Col componentClass={ ControlLabel } sm={9}>
                <FormControl
                  type="text" 
                  ref="clientEmail"
                  value={ this.props.client.email }
                />
              </Col>

              <Col componentClass={ ControlLabel } sm={3}>
                Email Message
              </Col>
              <Col componentClass={ ControlLabel } sm={9}>
                <FormControl
                  type="textarea" 
                  componentClass="textarea"
                  ref="emailMessage"
                  placeholder="Enter email message"
                />
              </Col>
            </FormGroup>

            <Col  sm={9} smOffset={3}>
            <ButtonToolbar>
              <Button 
                className={ "updateBtn" } 
                bsSize="small"
                bsStyle="primary" type="submit" 
                onClick={(e) => this.setPrices(e)}>
                Refresh Data
              </Button>

              <Button 
                className={ "updateBtn" } 
                bsSize="small"
                bsStyle="primary" type="submit" 
                onClick={(event) => {this.showEmailModal(event)}}>
                Email PDF
              </Button> 
            </ButtonToolbar>
            </Col>

            <Modal show={this.state.emailModal} onHide={this.hideEmailModal}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Sending Email</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>You are about to send a quote to <strong>{client}</strong> at <strong>{this.props.client.email}</strong>.</p>
                <p>Are you sure?</p>
                <ButtonToolbar>
                  <Button 
                    className={ "updateBtn" } 
                    bsSize="small"
                    bsStyle="primary" type="submit" 
                    onClick={(event) => this.submitSendMail(event)}>
                    Send Email
                  </Button> 

                  <Button 
                    className={ "updateBtn" } 
                    bsSize="small"
                    bsStyle="danger" type="submit" 
                    onClick={(event) => this.hideEmailModal(event)}>
                    Cancel
                  </Button> 
                </ButtonToolbar>
              </Modal.Body>
            </Modal>
          </Form>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setPrices();
  };
};

export default QuotePage
