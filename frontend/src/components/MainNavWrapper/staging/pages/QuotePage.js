import React from 'react'
import ReactDOM from 'react-dom'
import { 
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Table,
} from 'react-bootstrap'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class QuotePage extends React.Component{
  state = {
    client: this.props.client.firstname + ' ' + this.props.client.lastname,
    quoteId: 123,
    orderAmount: 10000,
    currency: 'Ethereum',
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
    commission: 4,
    totalPerCoin: 0,
    totalCoins: 0,
  };

  setPrices = () => {
    let exchange1, exchange2;
    if (this.state.currency === 'Bitcoin') {
        exchange1 = {
          name: 'ACX',
          bestPrice: this.props.ausPrices.BTC.acxBestBTC,
        };
        exchange2 = {
          name: 'BTC Markets',
          bestPrice: this.props.ausPrices.BTC.btcmBestBTC,
        };
    } else if (this.state.currency === 'Ethereum') {
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
      exchange1: exchange1,
      exchange2: exchange2,
      average: average,
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
              [ this.state.exchange1.name + ' Best Price:', this.state.exchange1.bestPrice ],
              [ this.state.exchange2.name + ' Best Price:', this.state.exchange2.bestPrice ],
              [ 'Average Australian Price', this.state.average ],
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
    const text = 'Please find our quote attached'
    const emailProps = {
      subject: subject,
      text: text,
      file: 0,
    }
    this.makePdf(emailProps);
  }

  handleChange = (e) => {
    const spotPrice = parseFloat(e.target.value);
    const totalPerCoin = spotPrice + (spotPrice * (this.state.commission / 100));
    
    this.setState({
      spotPrice: spotPrice,
      totalPerCoin: totalPerCoin,
    })
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
    } = this.state;
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: '50%'}}>
          <div style={{ marginRight: '3em' }}>

            <Form horizontal>
              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Client: 
                </Col>
                <Col componentClass={ ControlLabel } sm={5}>
                  {client}
                </Col>
              </FormGroup>
              
              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Currency: 
                </Col>
                <Col componentClass={ ControlLabel } sm={5}>
                  {currency}
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Order Amount: 
                </Col>
                <Col componentClass={ ControlLabel } sm={5}>
                  {orderAmount}
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  {exchange1.name} Best Price: 
                </Col>
                <Col componentClass={ ControlLabel } sm={5}>
                  {exchange1.bestPrice}
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  {exchange2.name} Best Price: 
                </Col>
                <Col componentClass={ ControlLabel } sm={5}>
                  {exchange2.bestPrice}
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Average Australian Price: 
                </Col>
                <Col componentClass={ ControlLabel } sm={5}>
                  {average}
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Commission %
                </Col>
                <Col sm={5}>
                  <FormControl type="text" ref="commission" defaultValue={ commission }/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Spot Price
                </Col>
                <Col sm={5}>
                  <FormControl
                    type="text"
                    ref="spotPrice"
                    value={ spotPrice }
                    placeholder="Spot Price"
                    onChange={ this.handleChange }
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Total Per Coin:
                </Col>
                <Col sm={5}>
                  <FormControl 
                    type="text" 
                    ref="totalPerCoin" 
                    value={ totalPerCoin }/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Total Coins:
                </Col>
                <Col sm={5}>
                  <FormControl 
                    type="text" 
                    ref="totalCoins" 
                    value={ (orderAmount / totalPerCoin).toFixed(8) }/>
                </Col>
              </FormGroup>
            </Form>
            <Button 
              className={ "updateBtn" } 
              bsSize="large"
              bsStyle="primary" type="submit" 
              onClick={(event) => this.setPrices(event)}>
              Refresh
            </Button>

            <Button 
              className={ "updateBtn" } 
              bsSize="large"
              bsStyle="primary" type="submit" 
              onClick={(event) => this.makePdf(event)}>
              Generate PDF
            </Button>

            <Button 
              className={ "updateBtn" } 
              bsSize="large"
              bsStyle="primary" type="submit" 
              onClick={(event) => this.submitSendMail(event)}>
              Email PDF
            </Button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setPrices();
  };
};

export default QuotePage
