pragma solidity ^0.8.0;

contract Bank {
    address public admin;
    mapping(address => uint256) public balances;
    uint256 public totalDeposit;
    struct TopDepositor {
        address account;
        uint256 amount;
    }
    TopDepositor[3] public topDepositors;
    constructor() {
        admin = msg.sender;
        for (uint256 i = 0; i < 3; i++) {
            topDepositors[i] = TopDepositor(address(0), 0);
        }
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "Access denied, you're not administrator."
        );
        _;
    }

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");

        address depositor = msg.sender;
        uint256 amount = msg.value;

        balances[depositor] += amount;
        totalDeposit += amount;

        _updateTopDepositors(depositor, balances[depositor]);
    }

    function withdraw(uint256 amount) external onlyAdmin {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(
            amount <= address(this).balance,
            "Insufficient contract balance"
        );

        payable(admin).transfer(amount);
    }

    function _updateTopDepositors(
        address depositor,
        uint256 newAmount
    ) private {
        for (uint256 i = 0; i < 3; i++) {
            if (topDepositors[i].account == depositor) {
                topDepositors[i].amount = newAmount;

                _sortTopDepositors();
            }
        }
        if (newAmount > topDepositors[2].amount) {
            topDepositors[2] = TopDepositor(depositor, newAmount);

            _sortTopDepositors();
        }
    }
    function _sortTopDepositors() private {
        for (uint256 i = 0; i < 2; i++) {
            for (uint256 j = 0; j < 2 - i; j++) {
                if (topDepositors[j].amount < topDepositors[j + 1].amount) {
                    TopDepositor memory temp = topDepositors[j];
                    topDepositors[j] = topDepositors[j + 1];
                    topDepositors[j + 1] = temp;
                }
            }
        }
    }
    function getDeposit(
        address user
    ) external view onlyAdmin returns (uint256) {
        return balances[user];
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    function getTopDepositors() external view returns (TopDepositor[3] memory) {
        return topDepositors;
    }
}
