### User
```
{
    _id: String,
    email: String,
    password: String
    details: {
      firstname: String,
      lastname: String
    }
}
```

### Clients
```
{
    _id: String,
    firstname: String,
    lastname: String,
    phone: number,
    email: string,
    status: {
      quoteSent: {
        type: Boolean,
        default: false
        },
       quoteAccepted: {
        type: Boolean,
        default: false
       },
       depositCleared: {
        type: Boolean,
        default: false
       },
       idVerified: {
        type: Boolean,
        default: false
       }
    }
}
```
  
### Order
```
{
    _id: String
    amount: Number,
    client: String(ClientId),
    admin: String(adminId),
    currency: String
    processed: {
      successful: Boolean,
      admin: String(adminId)
    }
}
```

### messages
```
{
    _id: String,
    message: String,
    for: {
      id: String,
      role: String(admin || client)
    },
    from: String(userID)
    time: String(Javascript Date object - year, month, hours)
}
```
### Graph
```
{
  askprice: {
    amount: Number,
    currency: String,
    time: Date(Javascript Date object - year, month, hours)
  }
}
```
### Settings
```
{
  bitfinexFloat: { 
    type: Number, 
    default: 0 
  },
  btceFloat: { 
    type: Number, 
    default: 0 
  },
  bitstampFloat: { 
    type: Number, 
    default: 0 
  },
  ethWalletAddress: String,
  btceWalletAddress: String
}
```
### Image
```
{
  s3URL: {
    type: String,
    required: true,
    trim: true
  },
  originalname: {
    type: String,
    required: true
  },
  clientId: String,
  idType: String
}
