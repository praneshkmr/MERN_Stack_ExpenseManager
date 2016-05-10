var ExpenseManager = React.createClass({
    handleExpenseSubmit: function (expense) {
        expense.user = "5731fcbe22ff331782516793";
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: expense,
            success: function(newExpense) {
                var expenses = this.state.data;
                var newExpenses = expenses.concat([newExpense]);
                this.setState({ data: newExpenses });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadExpensesFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadExpensesFromServer();
        setInterval(this.loadExpensesFromServer, this.props.pollInterval);
    },
    render: function(){
        return (
            <div className='container'>
                <ExpenseDashBoard className='row' data={this.state.data}/>
                <AddExpense className='row' onClickAddExpense={this.handleExpenseSubmit}/>
                <ExpenseList className='row' data={this.state.data}/>
            </div>
        );
    }
});

var ExpenseDashBoard = React.createClass({
    render: function(){
        var credit = 0, debit = 0, balance = 0;
        this.props.data.map(function (expense) {
            var amount = parseInt(expense.amount);
            if(amount > 0){
                credit += amount;
            }
            else if(amount < 0){
                debit += amount;
            }
           balance = credit + debit;
        });
        return(
            <div>
                <h1>Expense Dashboard</h1>
                <div className="col-md-4">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <h3 className="panel-title">Credit</h3>
                        </div>
                        <div className="panel-body">{credit}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Debit</h3>
                        </div>
                        <div className="panel-body">{debit}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Balance</h3>
                        </div>
                        <div className="panel-body">{balance}</div>
                    </div>
                </div>
            </div>
        );
    }
});

var ExpenseList = React.createClass({
    render: function(){
        var ExpenseNodes = this.props.data.map(function (expense) {
            return(
                <Expense data={expense} key={expense._id}></Expense>
            );
        });
        return(
            <div>
                <h1>Expenses</h1>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                        </tr>
                        {ExpenseNodes}
                    </tbody>
                </table>
            </div>
        );
    }
});

var AddExpense = React.createClass({
    getInitialState: function () {
        var newExpense = {
            date : '',
            title: '',
            amount: ''
        };
        return newExpense;
    },
    handleDateChange: function (e) {
        this.setState({ date : e.target.value });
    },
    handleAmountChange: function (e) {
        this.setState({ amount : e.target.value });
    },
    handleTitleChange: function (e) {
        this.setState({ title : e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var date = this.state.date.trim();
        var amount = this.state.amount.trim();
        var title = this.state.title.trim();
        if(!date || !amount || !title){
            return;
        }
        this.props.onClickAddExpense({ date:date, amount:amount, title:title });
        this.setState({ date:'', amount:'', title:'' });
    },
    render: function () {
        return(
            <div>
                <h1>Add Expense</h1>
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control" value={this.state.date} onChange={this.handleDateChange} placeholder="Date"/>
                    <input className="form-control" value={this.state.amount} onChange={this.handleAmountChange} placeholder="Amount"/>
                    <input className="form-control" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title"/>
                    <button type="submit" className="btn btn-primary">Add Expense</button>
                </form>
            </div>
        );
    }
});

var Expense = React.createClass({
    render:function () {
        return(
            <tr>
                <td>{this.props.data.date}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.amount}</td>
            </tr>
        );
    }
});

ReactDOM.render(<ExpenseManager url="/expenses" pollInterval="3000"/>, document.getElementById("content"));