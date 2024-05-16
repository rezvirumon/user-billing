import AddCustomer from "./AddCustomer";




const CustomerModa = () => {
    return (
        <div className="my-20">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Customer</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div className="border w-full">
                        <AddCustomer></AddCustomer>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CustomerModa;