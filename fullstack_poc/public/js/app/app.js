
var data = [
  { id: 1, title: "Salary", amount : 100000, date : "01-05-2016" },
  { id: 2, title: "Education Loan", amount : -6000, date : "02-05-2016" }
];

var ExpenseManager = React.createClass({
    render: function(){
        return (
            <div>
                <ExpenseDashBoard data={this.props.data}/>
                <AddExpense />
                <ExpenseList data={this.props.data}/>
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
                <table>
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
    render: function () {
        return(<div>Add Expense View</div>);
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