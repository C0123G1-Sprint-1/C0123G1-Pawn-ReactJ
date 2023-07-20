import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/navigate.css"
export function Navigate() {

    return(
        <>

            <nav  className="navbar navbar-expand-lg bg-body-tertiary"  style={{ height: "6rem" }}>
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Cầm đồ
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Thanh lý
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Trả đồ
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Thông tin cửa hàng
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Quản lý khách hàng
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Thông tin cá nhân
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Nhắn tin
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>


        </>
    )

}