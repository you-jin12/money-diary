package courage.moneydiary;

import lombok.Data;

@Data
public class MoneyData {

    private Long id;

    private String date;
    private String where;
    private String input;
    private String output;
    private String total;
    private String memo;

    public MoneyData(){}
}
