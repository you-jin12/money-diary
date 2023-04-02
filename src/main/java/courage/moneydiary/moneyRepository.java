package courage.moneydiary;

import java.util.HashMap;
import java.util.List;

public interface moneyRepository {

    public MoneyData save(MoneyData moneyData);
    public MoneyData findById(Long id);
    public List<MoneyData> findAll();
    //수정, 삭제 기능

}
