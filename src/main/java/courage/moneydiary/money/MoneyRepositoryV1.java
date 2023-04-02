package courage.moneydiary.money;

import courage.moneydiary.MoneyData;
import courage.moneydiary.moneyRepository;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Array;
import java.util.*;

@Repository
public class MoneyRepositoryV1 implements moneyRepository {

    private static final Map<Long,MoneyData> store=new HashMap<>();

    private static long number=0L;

    public MoneyData save(MoneyData moneyData){
        moneyData.setId(++number);
        store.put(moneyData.getId(),moneyData);
        return moneyData;
    }

    @Override
    public MoneyData findById(Long id) {
        MoneyData moneyData = store.get(id);
        return moneyData;
    }

    @Override
    public List<MoneyData> findAll() { // 저장된거 다 반환해라

        return new ArrayList<>(store.values());
    }

    public List<MoneyData> findByDate(String date){ //날짜로 객체 찾기
        List<MoneyData> dateList=new ArrayList<>();

        List<MoneyData> moneys = findAll();
        for(int i=0;i<moneys.size();i++){
            MoneyData moneyData = moneys.get(i);
            String date1 = moneyData.getDate(); // 내역의 날짜 추출
            if(date1.equals(date)){
                dateList.add(moneyData);
            }
        }

        return dateList;
    }

}
