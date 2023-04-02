package courage.moneydiary.money;

import courage.moneydiary.MoneyData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class moneyController {

    private final MoneyRepositoryV1 moneyRepositoryV1;

    @RequestMapping("money/form")
    public String moneyForm(Model model){

        List<MoneyData> moneys = moneyRepositoryV1.findAll();
        model.addAttribute("moneys",moneys);
        return "moneyForm";
    }

    @GetMapping("money/calendar")
    public String moneyCalendar(){
        return "calendar";
    }

    @GetMapping("money/day/{date}")
    public String moneyDay(@PathVariable String date,Model model){
        log.info("date={}",date);
        List<MoneyData> moneys = moneyRepositoryV1.findByDate(date);
        model.addAttribute("moneys",moneys);
        model.addAttribute("date",date);
        return "/money";
    }
    @PostMapping("money/save")
    public String moneySave(Model model,MoneyData moneyData){
        log.info("memo={}",moneyData.getMemo());
        moneyRepositoryV1.save(moneyData);
        List<MoneyData> moneys = moneyRepositoryV1.findAll();
        model.addAttribute("moneys",moneys);
        return "/moneyForm";
    }


}
