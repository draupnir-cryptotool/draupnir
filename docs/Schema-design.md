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
{
    _id: String,
    firstname: String,
    lastname: String,
    phone: number,
    email: string,
    status: {
      phonecall: Boolean,
      email: Boolean,
      depositCleared: Boolean
    }
}
  
### Order
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

### messages
{
    _id: String,
    message: String,
    client: String(ClientId),
    Admin: String(AdminId),
    time: String(Javascript Date object - year, month, hours)
}
### Graph
{
  askprice: {
    amount: Number,
    currency: String,
    time: Date(Javascript Date object - year, month, hours)
  }
}
