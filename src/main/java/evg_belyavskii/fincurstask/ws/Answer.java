
package evg_belyavskii.fincurstask.ws;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Answer complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Answer">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cost" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *         &lt;element name="hotcost" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Answer", propOrder = {
    "cost",
    "hotcost"
})
public class Answer {

    protected Float cost;
    protected Float hotcost;

    /**
     * Gets the value of the cost property.
     * 
     * @return
     *     possible object is
     *     {@link Float }
     *     
     */
    public Float getCost() {
        return cost;
    }

    /**
     * Sets the value of the cost property.
     * 
     * @param value
     *     allowed object is
     *     {@link Float }
     *     
     */
    public void setCost(Float value) {
        this.cost = value;
    }

    /**
     * Gets the value of the hotcost property.
     * 
     * @return
     *     possible object is
     *     {@link Float }
     *     
     */
    public Float getHotcost() {
        return hotcost;
    }

    /**
     * Sets the value of the hotcost property.
     * 
     * @param value
     *     allowed object is
     *     {@link Float }
     *     
     */
    public void setHotcost(Float value) {
        this.hotcost = value;
    }

}
