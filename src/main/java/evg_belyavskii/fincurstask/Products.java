package evg_belyavskii.fincurstask;

import java.io.Serializable;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/*
 * Products Class - containe get/set methodes to Products data 
 * @version 1.1 2.02.2017
 * @author Yauheni Bialiauski
 */

@XmlRootElement (name = "products")
public class Products implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private Integer id;
    private String prName;
    private String titleImgSrc;
    private String imgSrc;
    private Float priceText;
    private Float strike;
    private String prText;
    private Integer stars;
    private Integer category;
    private Integer count;

    public Products() {
    }

    public Products(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
    
    @XmlElement
    public void setId(Integer id) {
        this.id = id;
    }

    public String getPrName() {
        return prName;
    }

    @XmlElement
    public void setPrName(String prName) {
        this.prName = prName;
    }

    public String getTitleImgSrc() {
        return titleImgSrc;
    }

    @XmlElement
    public void setTitleImgSrc(String titleImgSrc) {
        this.titleImgSrc = titleImgSrc;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    @XmlElement
    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public Float getPriceText() {
        return priceText;
    }

    @XmlElement
    public void setPriceText(Float priceText) {
        this.priceText = priceText;
    }

    public Float getStrike() {
        return strike;
    }

    @XmlElement
    public void setStrike(Float strike) {
        this.strike = strike;
    }

    public String getPrText() {
        return prText;
    }

    @XmlElement
    public void setPrText(String prText) {
        this.prText = prText;
    }

    public Integer getStars() {
        return stars;
    }

    @XmlElement
    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public Integer getCategory() {
        return category;
    }

    @XmlElement
    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getCount() {
        return count;
    }

    @XmlElement
    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Products)) {
            return false;
        }
        Products other = (Products) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "evg_belyavskii.fincurstask.Products[ id=" + id + " ]";
    }
    
}
