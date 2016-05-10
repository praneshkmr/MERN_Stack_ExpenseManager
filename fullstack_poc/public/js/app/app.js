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
    updateExpense: function (expense) {
        expense.user = "5731fcbe22ff331782516793";
        $.ajax({
            url: this.props.url + '/' + expense._id,
            dataType: 'json',
            type: 'PUT',
            data: expense,
            success: function(newExpense) {
                this.loadExpensesFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    deleteExpense: function (expense) {
        expense.user = "5731fcbe22ff331782516793";
        $.ajax({
            url: this.props.url + '/' + expense._id,
            type: 'DELETE',
            success: function(newExpense) {
                this.loadExpensesFromServer();
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
                <ExpenseList className='row' data={this.state.data} onExpenseUpdate={this.updateExpense} onExpenseDelete={this.deleteExpense}/>
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
    getInitialState: function(){
        return {
            expenseInUpdateMode : []
        };
    },
    setExpenseToUpdateMode: function(expense){
        var expenseInUpdateMode = this.state.expenseInUpdateMode;
        expenseInUpdateMode.push(expense._id);
        this.setState({ expenseInUpdateMode : expenseInUpdateMode });
    },
    unsetExpenseToUpdateMode: function(expense){
        var expenseInUpdateMode = this.state.expenseInUpdateMode;
        var index = expenseInUpdateMode.indexOf(expense._id);
        expenseInUpdateMode.splice(index, 1);
        this.setState({ expenseInUpdateMode : expenseInUpdateMode });
    },
    updateExpense: function(expense){
        this.props.onExpenseUpdate(expense);
        this.unsetExpenseToUpdateMode(expense);
    },
    deleteExpense: function(expense){
        this.props.onExpenseDelete(expense);
    },
    render: function(){
        var that = this;
        var ExpenseNodes = this.props.data.map(function (expense) {
            if( that.state.expenseInUpdateMode.indexOf(expense._id) != -1 ){
                return(
                    <ExpenseUpdate data={expense} key={expense._id} onSetExpenseUpdateMode={that.updateExpense} onUnSetExpenseUpdateMode={that.unsetExpenseToUpdateMode}></ExpenseUpdate>
                );
            }
            else {
                return(
                    <Expense data={expense} key={expense._id} onExpenseEditClick={that.setExpenseToUpdateMode.bind(that, expense)} onExpenseDeleteClick={that.deleteExpense.bind(that, expense)}></Expense>
                );
            }
        });
        if ( ExpenseNodes.length > 0 ){
            return(
                <div>
                    <h1>Expenses</h1>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <th>Date (mm/dd/yyyy)</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Options</th>
                            </tr>
                            {ExpenseNodes}
                        </tbody>
                    </table>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h1>Expenses</h1>
                    No Expenses Found. Please Add One.
                </div>
            );
        }
    }
});

var Expense = React.createClass({
    formatDate: function(date){
        var d = new Date(date);
        var dd = d.getDate();
        var mm = d.getMonth()+1; //January is 0!

        var yyyy = d.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var d = mm+'/'+dd+'/'+yyyy;
        return d;
    },
    render:function () {
        return(
            <tr>
                <td>{this.formatDate(this.props.data.date)}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.amount}</td>
                <td><button type="submit" className="btn btn-default" onClick={this.props.onExpenseEditClick}>Edit</button></td>
                <td><button type="submit" className="btn btn-danger" onClick={this.props.onExpenseDeleteClick}>Delete</button></td>
            </tr>
        );
    }
});

var ExpenseUpdate = React.createClass({
    formatDate: function(date){
        var d = new Date(date);
        var dd = d.getDate();
        var mm = d.getMonth()+1; //January is 0!

        var yyyy = d.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var d = mm+'/'+dd+'/'+yyyy;
        return d;
    },
    getInitialState: function () {
        var expense = {
            date : this.formatDate(this.props.data.date),
            title: this.props.data.title,
            amount: this.props.data.amount,
            _id: this.props.data._id
        };
        return expense;
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
    updateExpense: function(){
        this.props.onSetExpenseUpdateMode(this.state);
    },
    cancelUpdateExpense: function(){
        this.props.onUnSetExpenseUpdateMode(this.state);
    },
    render:function () {
        return(
            <tr>
                <td><input className="form-control" value={this.state.date} onChange={this.handleDateChange} placeholder="Date (mm/dd/yyyy)"/></td>
                <td><input className="form-control" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title"/></td>
                <td><input className="form-control" value={this.state.amount} onChange={this.handleAmountChange} placeholder="Amount"/></td>
                <td><button type="submit" className="btn btn-default" onClick={this.updateExpense}>Update</button></td>
                <td><button type="submit" className="btn btn-danger" onClick={this.cancelUpdateExpense}>Cancel</button></td>
            </tr>
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
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="sr-only">Date</label>
                        <input className="form-control" value={this.state.date} onChange={this.handleDateChange} placeholder="Date (mm/dd/yyyy)"/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only">Title</label>
                        <input className="form-control" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only">Amount</label>
                        <input className="form-control" value={this.state.amount} onChange={this.handleAmountChange} placeholder="Amount"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Expense</button>
                </form>
            </div>
        );
    }
});

ReactDOM.render(<ExpenseManager url="/expenses" pollInterval="3000"/>, document.getElementById("content"));