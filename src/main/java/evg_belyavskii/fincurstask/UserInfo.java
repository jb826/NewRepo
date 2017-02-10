
package evg_belyavskii.fincurstask;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/*
 * UserInfo Class - containe get/set methodes to profile data 
 * @version 1.2 2.03.2017
 * @author Yauheni Bialiauski
 */

@XmlRootElement(name = "userinfo")
public class UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;
    private String lname;
    private String fname;
    private String address;
    private String email;
    private String phone;
    private String login;
    private int count;

    public UserInfo() {
    }

    public UserInfo(String login) {
        this.login = login;
    }

    public String getLname() {
        return lname;
    }

    @XmlElement
    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getFname() {
        return fname;
    }
    
    @XmlElement
    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getAddress() {
        return address;
    }

    @XmlElement
    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    @XmlElement
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    @XmlElement
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLogin() {
        return login;
    }

    @XmlElement
    public void setLogin(String login) {
        this.login = login;
    }
    
    public int getCount() {
        return count;
    }

    @XmlElement
    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (login != null ? login.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof UserInfo)) {
            return false;
        }
        UserInfo other = (UserInfo) object;
        if ((this.login == null && other.login != null) || (this.login != null && !this.login.equals(other.login))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        String data="UserInfo:" + login +"|"+phone+"|"+count;
        return data;
    }
    
}
