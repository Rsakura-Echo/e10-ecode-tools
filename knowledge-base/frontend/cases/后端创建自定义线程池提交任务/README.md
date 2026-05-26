## 后端创建自定义线程池提交任务

### java代码示例

> 源码文件查看resources目录下附件

线程池任务调度器:


```java
/**
 * 线程池任务调度器
 *
 * <p>负责创建和管理业务数据处理专用的线程池实例，提供全局访问入口。</p>
 *
 * @author
 * @version 1.0
 * @since 2023-09-20
 */
package com.weaver.seconddev.dispatcher;

import com.weaver.common.threadPool.ThreadPoolUtil;
import com.weaver.common.threadPool.constant.RunModeConstant;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadPoolExecutor;

public class SecondevTaskDispatcher {
    /**
     * 线程池名称（用于监控识别）
     * @see ThreadPoolUtil#getPool 通过名称标识不同业务线程池
     */
    private static final String POOL_NAME = "secondev-data-process";

    /**
     * 核心线程数（长期保留的线程数量）
     * @value 默认值 4，建议通过配置中心动态调整
     */
    private static final int CORE_POOL_SIZE = 4;

    /**
     * 最大线程数（突发流量时允许扩展的线程上限）
     * @value 默认值 10，建议根据压测结果调整
     */
    private static final int MAX_POOL_SIZE = 10;

    /**
     * 业务数据处理线程池实例
     *
     * <p>线程池参数说明：</p>
     * <ul>
     *   <li>keepAliveTime: 30秒（非核心线程空闲存活时间）</li>
     *   <li>queueCapacity: 200（队列最大容量）</li>
     *   <li>runMode: ArrayBlockingQueue（有界队列保证资源可控）</li>
     *   <li>拒绝策略: CallerRunsPolicy（队列满时由提交线程直接执行）</li>
     * </ul>
     * @warning 需确保应用关闭时调用shutdown()释放资源
     */
    private static final ExecutorService SECONDEV_EXECUTOR = ThreadPoolUtil.getPool(
            POOL_NAME, CORE_POOL_SIZE, MAX_POOL_SIZE, 30, 200,
            RunModeConstant.ABQUEUE, new ThreadPoolExecutor.CallerRunsPolicy()
    );

    /**
     * 获取业务数据处理器线程池实例
     *
     * @return 全局唯一的线程池实例，用于执行异步数据处理任务
     * @note 方法名建议改为 getExecutor() 以提高可读性（当前名称存在拼写歧义）
     */
    public static ExecutorService getEcodeExecutor() {
        return SECONDEV_EXECUTOR;
    }
}

```

业务服务示例类:


```java
/**
 * 业务服务示例类
 *
 * <p>演示如何通过线程池提交异步任务，包含租户上下文传递的最佳实践。</p>
 *
 * @author
 * @version 1.0
 */
package com.weaver.seconddev.dispatcher;

import com.weaver.framework.rpc.context.impl.TenantRpcContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TestService {

    private static final Logger log = LoggerFactory.getLogger(TestService.class);

    /**
     * 异步任务处理示例方法
     *
     * <p>典型调用场景：Controller接收请求后调用此方法进行异步处理</p>
     *
     * @param args 命令行参数（当前示例未实际使用）
     * @implNote 重要实现细节：
     * <ol>
     *   <li>通过静态方法获取线程池实例提交任务</li>
     *   <li>在异步线程中设置租户上下文（需确保后续清理）</li>
     *   <li>使用CallerRunsPolicy时需注意可能的主线程阻塞问题</li>
     * </ol>
     */
    public void test(String[] args) {
        String tenantKey = ""; // 应通过参数传入实际租户标识
        SecondevTaskDispatcher.getEcodeExecutor().execute(() -> {
            log.info("Async task started: processing data...");
            try {
                // 设置当前线程的租户上下文（需确保finally块中清理）
                TenantRpcContext.setTargetTenantKey(tenantKey);

                // 模拟业务操作（实际应替换为真实业务逻辑）
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Task execution interrupted", e);
            } catch (RuntimeException e) {
                // 捕获运行时异常并记录错误详情
                log.error("Business logic runtime exception", e);
            } catch (Exception e) {
                // 兜底异常处理（确保不出现未捕获异常）
                log.error("Unexpected exception occurred", e);
            } finally {
                /*
                 * 清理操作：
                 * 必须清除线程局部变量，避免内存泄漏和上下文污染
                 */
            }
            log.info("Async task ends.");
        });
    }
}

```

线程池组件更多api请查阅类 `ThreadPoolUtil`。