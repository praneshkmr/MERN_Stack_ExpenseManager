
var data = [
  { id: 1, title: "Salary", amount : 100000, date : "01-05-2016" },
  { id: 2, title: "Education Loan", amount : -6000, date : "02-05-2016" }
];

var ExpenseManager = React.createClass({
    handleExpenseSubmit: function (expense) {
        
    },
    render: function(){
        return (
            <div className='container'>
                <ExpenseDashBoard className='row' data={this.props.data}/>
                <AddExpense className='row'/>
                <ExpenseList className='row' data={this.props.data}/>
            </div>
        );
    }
});

var ExpenseDashBoard = React.createClass({
    render: function(){
        return(
            <div>
                Expense Dashboard View
             </div>
            );
    }
});

var ExpenseList = React.createClass({
    render: function(){
        var ExpenseNodes = this.props.data.map(function (expense) {
            return(
                <Expense data={expense} key={expense.id}></Expense>
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
        console.log("Submit Handle");
        e.preventDefault();
        var date = this.state.date.trim();
        var amount = this.state.amount.trim();
        var title = this.state.title.trim();
        if(!date || !amount || !title){
            return;
        }
        //this.
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

ReactDOM.render(<ExpenseManager data={data}/>, document.getElementById("content"));